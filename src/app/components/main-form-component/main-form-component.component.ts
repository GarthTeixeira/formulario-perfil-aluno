import { Component  } from '@angular/core';
import {FormBuilder, FormGroup ,  Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import getCompetencesFromArray from '../../mocks/generateCompetencias';
import { MainFormUtils } from '../../utils/main-form-utils';
import { CompetecenciasService } from '../../services/competecencias.service';
import { map } from 'rxjs';
import { FormProfessoresService } from '../../services/form-professores.service';
import { DataSharedService } from '../../shared/data-shared.service';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';

interface IDictionarySkill<TValue> {
  [id: string]: TValue;
}

type FormMode = 'AREA'|'COGNITIVE'| undefined;

type SubmitParams = { 
  requestParams: { disciplina:string | undefined, competencias:any, professor:any, area:string }
  callback: Function
} | null;

@Component({
  selector: 'app-main-form-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './main-form-component.component.html',
  styleUrl: './main-form-component.component.scss'
})
export class MainFormComponent{

  

  public itemSelecionado: {tag:string, title:string, color:string, id: string} | undefined = {tag:'', title:'', color:'', id:''};

  public formMode: FormMode = 'AREA'; 
  
  public disiplnaSelecionada:string = '';

  public questionarioAreasFormGroup: FormGroup = this._formBuilder.group([]);

  public questionarioCognitivoFormGroup: FormGroup = this._formBuilder.group([]);

  public isLinear = true;

  public getSkillLevelsAswer:IDictionarySkill<string> = {'high':'Alto', 'basic':'Medio', 'low':'Baixo'}

  public getSkillLevelsAswerNumberValue(skill:string) {
    return MainFormUtils.getSkillLevelsAswerNumberValue(skill)
  }

  get competences():AbstractControl<any, any> | any { return this.questionarioAreasFormGroup?.get('competences') || []; }

  get competencesCognitive(): AbstractControl<any,any> | any {return this.questionarioCognitivoFormGroup?.get('competencesCognitive') || [] ;}

  get skillLevelsOptions():string[] { return MainFormUtils.skillLevels } 

  public iterableCompetences:any[] = []

  public iterableCognitives:any[] =[]
  
  public formTitle (competenceDescription: any) {
    return `${this.itemSelecionado?.title} - ${competenceDescription}`
  }
  constructor(
    private formProfessoresService: FormProfessoresService , 
    private _formBuilder: FormBuilder, 
    private competenciasService:CompetecenciasService,
    private localStorageService:LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const {tag , title, color, id} = history.state.itemData;
    this.itemSelecionado = {tag, title, color, id}

    MainFormUtils.getCompetences(this._formBuilder,this.competenciasService, tag)
      .subscribe((competencesFromArray: any) => {
        this.iterableCompetences = competencesFromArray
        console.log( typeof this.iterableCompetences)
        this.questionarioAreasFormGroup = MainFormUtils.getQuestionarioFormGroup(this.iterableCompetences,this._formBuilder);
        console.log('Por Area:',this.questionarioAreasFormGroup)
        this.formMode = 'AREA';
      })
    
    MainFormUtils.getCognitiveCompetences(this._formBuilder,this.competenciasService)
      .subscribe((competencesFromArray: any) => {
        this.iterableCognitives = competencesFromArray
        this.questionarioCognitivoFormGroup = MainFormUtils.getQuestionarioFormGroup(this.iterableCognitives,this._formBuilder);
        console.log( typeof this.iterableCompetences)
        console.log('Cognitivos:',this.questionarioCognitivoFormGroup)
      })
    
  }

  gotoNextPhase = (stepper: any) => {
    stepper.reset()
    this.formMode = 'COGNITIVE'
  }

  goToPreviousRoute = (stepper: any) => {
    stepper.reset()
    this.router.navigate(['/disciplinas'])
  }

  onSubmit(stepper: any) {
   

    let submitParams: SubmitParams = (this.formMode === 'AREA') ? {
      requestParams: {
        'disciplina': this.itemSelecionado?.id, 
        'competencias': this.questionarioAreasFormGroup.getRawValue().competences, 
        'professor':  this.localStorageService.getItem('userData')['id'],
        'area': this.itemSelecionado?.tag || ''
      },
      callback: this.gotoNextPhase
      
    } : {
      requestParams: {
        'disciplina': this.itemSelecionado?.id,
        'competencias':this.questionarioCognitivoFormGroup.getRawValue().competencesCognitive,
        'professor': this.localStorageService.getItem('userData')['id'],
        'area': "COGNITIVOS"
      },
      callback: this.goToPreviousRoute
    }


    if (submitParams) {
      const resposta = MainFormUtils.makeRespostaForm(submitParams?.requestParams);
      this.formProfessoresService.insertResposta(resposta).subscribe({
        next: () => {submitParams?.callback(stepper)},
        error: (error) => {
          console.error(error)
          stepper.reset();
        }
      })
      
    }
  }

 
}
