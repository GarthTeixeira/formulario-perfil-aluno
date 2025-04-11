import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharedService } from '../../shared/data-shared.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DadosRespostaProfessorInterface } from '../../interfaces/dados-reposta-professor-interface';
import { formatarTelefone } from '../../utils/professor-form-utils';
import { FormProfessoresService } from '../../services/form-professores.service';
import { EscolasService } from '../../services/escolas.service';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { UserDataLocalStorage } from '../../types/localStorageTypes';
import { LoadingFormFieldComponent } from '../loading-form-field/loading-form-field.component';
import { phoneValidator } from '../../validators/phone.validator';
@Component({
  selector: 'app-form-cadastro-formulario',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LoadingFormFieldComponent,
  ],
  templateUrl: './form-cadastro-formulario.component.html',
  styleUrl: './form-cadastro-formulario.component.scss',
})
export class FormCadatroFormularioComponent {
  public serieOptions: any[] = [];

  public selectedSchool: any;

  public applyForm: FormGroup = new FormGroup({});

  public isSending: boolean = false;

  public turmasOptions: any[] = [];

  public loadingSchoolData: Observable<any> | null = null;

  public errorLoadingSchools: boolean = false;

  public selectedTurmas: Set<any> = new Set();

  public formatarTelefone = formatarTelefone;

  public sendData: (data: DadosRespostaProfessorInterface) => Observable<any> =
    this._professoresService.insertProfessor;

  constructor(
    private dataService: DataSharedService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _professoresService: FormProfessoresService,
    private _escolasService: EscolasService
  ) {
    this.loadingSchoolData = this._escolasService.getEscolasOptions();
  }

  get escolaControl(): FormControl {
    return this.applyForm.get('escola') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.applyForm.get('telefone') as FormControl;
  }
  get enableTurma(): boolean {
    return this.turmasOptions.length != 0;
  }
  ngOnInit() {
    if (this.localStorageService.getItem('userData')) {
      //TODO:realizar método para verificar se o usuário já está logado
      //this.router.navigate(['/areas'])
    }
    this.applyForm = this._formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      escola: [{}, Validators.required],
      telefone: [null, phoneValidator()],
    });

    this.applyForm
      .get('escola')
      ?.valueChanges.subscribe(this.onChangeEscola.bind(this));
  }

  onChangeEscola(event: MatSelectChange) {
    this.selectedSchool = this.applyForm.get('escola')?.value;
    this.turmasOptions = this.selectedSchool.turmas;
  }

  onChangeTurma(event: MatSelectChange) {
    this.selectedTurmas = new Set(event.value);
  }

  showTitleOfTurma(turma: any): string {
    return `${turma.nome} - ${turma.serie} (${turma.ano})`;
  }

  //Improve performance
  trackById(index: number, item: any): number {
    return item.id;
  }

  protected submitAlunoForm() {
    this.isSending = true;
    const professor: DadosRespostaProfessorInterface = this.applyForm.value;
    professor.escola.turmas = professor.escola.turmas.filter((turma) =>
      this.selectedTurmas.has(turma)
    );
    this._professoresService.insertProfessor(professor).subscribe({
      next: (response: { id: string }) => {
        console.log(response);
        this.dataService.setData(professor.escola.id);
        this.isSending = false;
        this.router.navigate(['/selecionar-formulario']);
      },
      error: (error) => {
        console.error(error);
        this.isSending = false;
      },
    });
  }
}
