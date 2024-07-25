import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharedService } from '../../shared/data-shared.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Observable, delay, of } from 'rxjs';
import { DadosRespostaProfessorInterface } from '../../interfaces/dados-reposta-professor-interface';
import { ProfessorFormUtils } from '../../utils/professor-form-utils';
import { FormProfessoresService } from '../../services/form-professores.service';
import { EscolasService } from '../../services/escolas.service';
@Component({
  selector: 'app-form-cadastro-aluno',
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

  ],
  templateUrl: './form-cadastro-aluno.component.html',
  styleUrl: './form-cadastro-aluno.component.scss'
})
export class FormCadastroAlunoComponent {

  public serieOptions: string[] = ['1º ano do ensino médio', '2º ano do ensino médio', '3º ano do ensino médio']

  public escolasOptions: {name: string, id: any, turmas:{nome:string}[] }[] = []

  public applyForm: FormGroup = new FormGroup({})

  public isSending: boolean = false

  public turmasOptions: string[] = []

  public sendData: (data: DadosRespostaProfessorInterface) => Observable<any> = this._professoresService.insertProfessor;

  constructor(
    private dataService: DataSharedService,
    private router:Router, 
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _professoresService: FormProfessoresService,
    private _escolasService: EscolasService
  ) {}

  ngOnInit() {
    this.applyForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      escola: ['', Validators.required],
      turma: ['', Validators.required],
      ano_escolar: ['', Validators.required],
    })

    this._escolasService.getEscolasOptions().subscribe({
      next: (response) => {
        this.escolasOptions = response
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onChange(value: string){
    this.turmasOptions = this.escolasOptions.find(escola => escola.id === value)?.turmas.map(turma=>turma.nome) || []
  }

  protected submitAlunoForm() {
    this.isSending = true
    const professor:DadosRespostaProfessorInterface = ProfessorFormUtils.makeAlunoFromFormGroup(this.applyForm.value)
    console.log(professor)
    this._professoresService.insertProfessor(professor).subscribe({
      next: (response) => {
        const userData = {...response, ...professor}
        this.dataService.setData(userData)
        this.router.navigate(['/areas'])
        this.isSending = false
      },
      error: (error) => {
        console.error(error)
        this.isSending = false
      }
    })
  }
}
