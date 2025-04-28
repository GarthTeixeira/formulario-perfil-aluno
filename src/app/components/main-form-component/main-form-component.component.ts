import { Component, computed, Signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MainFormUtils } from '../../utils/main-form-utils';
import { CompetecenciasService } from '../../services/competecencias.service';
import { FormProfessoresService } from '../../services/form-professores.service';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { MatSliderModule } from '@angular/material/slider';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DecodeUTF8Pipe } from '../../pipes/decode-utf8.pipe';
import { ResponsiveService } from '../../services/responsive.service';

interface IDictionarySkill<TValue> {
  [id: string]: TValue;
}

type FormMode = 'AREA' | 'COGNITIVE' | undefined;

type SubmitParams = {
  requestParams: {
    disciplina: string | undefined;
    competencias: any;
    formulario: string;
    professor: any;
    area: string;
  };
  callback: Function;
} | null;

@Component({
  selector: 'app-main-form-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule,
    DecodeUTF8Pipe,
  ],
  templateUrl: './main-form-component.component.html',
  styleUrl: './main-form-component.component.scss',
})
export class MainFormComponent {
  public INICIAL_VALUE: number = 5.0;

  public itemSelecionado:
    | { tag: string; title: string; color: string; id: string }
    | undefined = { tag: '', title: '', color: '', id: '' };

  public formMode: FormMode = 'AREA';

  public disiplnaSelecionada: string = '';

  public questionarioAreasFormGroup: FormGroup = this._formBuilder.group([]);

  public questionarioCognitivoFormGroup: FormGroup = this._formBuilder.group(
    []
  );

  public isLinear = true;

  get competences(): AbstractControl<any, any> | any {
    return this.questionarioAreasFormGroup?.get('competences') || [];
  }

  habilitieValue(competenceIndex: number, habilitieIndex: number): number {
    return this.questionarioAreasFormGroup?.get('competences')?.value[competenceIndex]?.habilidades[habilitieIndex] || 0;
  }

  competenceGognitiveValue(competenceIndex:number):number{
    return this.questionarioCognitivoFormGroup?.get('competencesCognitive')?.value[competenceIndex]?.resposta || 0;
  }

  get competencesCognitive(): AbstractControl<any, any> | any {
    return (
      this.questionarioCognitivoFormGroup?.get('competencesCognitive') || []
    );
  }

  get skillLevelsOptions(): string[] {
    return MainFormUtils.skillLevels;
  }

  get tituloDisciplina(): string {
    return this.itemSelecionado?.title as string;
  }

  public iterableCompetences: any[] = [];

  public iterableCognitives: any[] = [];

  public loadingCompetencias: Observable<any> = new Observable();

  public errorNote = '';

  public stepperOrientation: Signal<StepperOrientation> = computed(() => {
    if (this.responiveService.largeWidth()) {
      return 'horizontal';
    } return 'vertical';
  }
  );

  constructor(
    private formProfessoresService: FormProfessoresService,
    private _formBuilder: FormBuilder,
    private competenciasService: CompetecenciasService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private responiveService:ResponsiveService
  ) {}

  ngOnInit(): void {
    const { tag, title, color, id } = history.state.itemData;
    this.itemSelecionado = { tag, title, color, id };

    this.loadingCompetencias = forkJoin([
      MainFormUtils.getCompetences(
        this._formBuilder,
        this.competenciasService,
        tag
      ),
      MainFormUtils.getCognitiveCompetences(
        this._formBuilder,
        this.competenciasService
      ),
    ]).pipe(
      catchError((error) => {
        console.error(`Erro ao carregar entidade disciplinas:`, error);
        this.errorNote = `${error.status}: ${error.statusText} `;
        return of([]);
      })
    );

    this.loadingCompetencias.subscribe(([compArea, compCognitive]) => {
      this.iterableCompetences = compArea;
      this.iterableCognitives = compCognitive;

      this.questionarioAreasFormGroup = MainFormUtils.getQuestionarioFormGroup(
        this.iterableCompetences,
        this._formBuilder,
        this.INICIAL_VALUE
      );

      this.questionarioCognitivoFormGroup =
        MainFormUtils.getQuestionarioFormGroup(
          this.iterableCognitives,
          this._formBuilder,
          this.INICIAL_VALUE
        );
      console.log('Por Area:', this.questionarioAreasFormGroup);
      console.log('Cognitivos:', this.questionarioCognitivoFormGroup);

      this.formMode = 'AREA';
    });
  }

  gotoNextPhase = (stepper: any) => {
    stepper.reset();
    this.formMode = 'COGNITIVE';
  };

  goToPreviousRoute = (stepper: any) => {
    stepper.reset();
    this.router.navigate(['/areas']);
  };

  onSubmit(stepper: any) {
    const userData = this.localStorageService.getItem('userData');
    const isAreaMode = this.formMode === 'AREA';
    const commonParams = {
      disciplina: this.itemSelecionado?.id,
      formulario: userData['id'],
      professor: {
        nome: userData['nome'],
        email: userData['email'],
      },
    };

    let submitParams: SubmitParams = {
      requestParams: {
        ...commonParams,
        competencias: isAreaMode
          ? this.questionarioAreasFormGroup.getRawValue().competences
          : this.questionarioCognitivoFormGroup.getRawValue()
              .competencesCognitive,
        area: isAreaMode ? this.itemSelecionado?.tag || '' : 'COGNITIVOS',
      },
      callback: isAreaMode ? this.gotoNextPhase : this.goToPreviousRoute,
    };

    if (submitParams) {
      const resposta = MainFormUtils.makeRespostaForm(
        submitParams?.requestParams
      );
      this.formProfessoresService.insertResposta(resposta).subscribe({
        next: () => {
          submitParams?.callback(stepper);
        },
        error: (error) => {
          console.error(error);
          stepper.reset();
        },
      });
    }
  }
}
