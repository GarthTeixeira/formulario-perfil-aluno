import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharedService } from '../../shared/data-shared.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Observable, delay, of } from 'rxjs';
import { AlunoInterface } from '../../interfaces/aluno-interface';
import { AlunoFormUtils } from '../../utils/aluno-form-utils';
import { FormAlunosService } from '../../services/form-alunos.service';
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

  public escolasOptions: {nome: string, id: any}[] = [{nome: 'escola 1', id: 1}, {nome: 'escola 2', id: 2}, {nome: 'escola 3', id: 3}]

  public applyForm: FormGroup = new FormGroup({})

  public isSending: boolean = false

  public sendData: (data: AlunoInterface) => Observable<any> = this._alunoService.insertAluno;

  constructor(
    private dataService: DataSharedService,
    private router:Router, 
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _alunoService: FormAlunosService
  ) {}

  ngOnInit() {
    this.applyForm = this._formBuilder.group({
      name: ['', Validators.required],
      serie: ['', Validators.required],
      email: ['', Validators.email],
      matricula: ['', Validators.required],
    })
  }

  protected getSerieValue = (serie: string): string => {
    return serie.slice(0, 6)
  }

  protected submitAlunoForm() {
    this.isSending = true
    const aluno:AlunoInterface = AlunoFormUtils.makeAlunoFromFormGroup(this.applyForm.value)
    this._alunoService.insertAluno(aluno).subscribe({
      next: (response) => {
        this.dataService.setData(response)
        this.router.navigate(['/areas'])
      },
      error: (error) => {
        console.error(error)
        this.isSending = false
      }
    })
  }
}
