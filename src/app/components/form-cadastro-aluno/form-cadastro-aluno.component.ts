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
import { makeAlunoFromFormGroup } from '../../utils/professor-form-utils';
import { FormProfessoresService } from '../../services/form-professores.service';
import { EscolasService } from '../../services/escolas.service';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { UserDataLocalStorage } from '../../types/types';
import { DecodeUTF8Pipe } from '../../pipes/decode-utf8.pipe';
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
    DecodeUTF8Pipe
  ],
  templateUrl: './form-cadastro-aluno.component.html',
  styleUrl: './form-cadastro-aluno.component.scss'
})
export class FormCadastroAlunoComponent {

  public serieOptions: any[] = []

  public escolasOptions: {name: string, id: any, turmas:{nome:string, id: string, serie: string}[] }[] = []

  public selectedSchool: any;

  public applyForm: FormGroup = new FormGroup({})

  public isSending: boolean = false

  public turmasOptions: any[] = []

  public sendData: (data: DadosRespostaProfessorInterface) => Observable<any> = this._professoresService.insertProfessor;

  constructor(
    private dataService: DataSharedService,
    private localStorageService: LocalStorageService,
    private router:Router, 
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _professoresService: FormProfessoresService,
    private _escolasService: EscolasService
  ) {}

  ngOnInit() {
    if(this.localStorageService.getItem('userData')){
      //TODO:realizar método para verificar se o usuário já está logado
      //this.router.navigate(['/areas'])
    }
    this.applyForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      escola: ['', Validators.required],
      serie: ['', Validators.required],
      turma: ['', Validators.required],
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

  onChangeEscola(value: string){
    this.selectedSchool = this.escolasOptions.find(escola=>escola.id == value)
    
    this.serieOptions = [ ... new Set(
      this.selectedSchool?.turmas.map((turma: any) => turma?.serie || '') || []
    )]
    
  }

  onChangeSerie(value: string) {
    this.turmasOptions = this.selectedSchool.turmas.filter((turma:any)=> turma.serie == value)
  }

  //Improve performance
  trackById(index: number, item: any): number {
    return item.id;
  }

  protected submitAlunoForm() {
    this.isSending = true
    const professor:DadosRespostaProfessorInterface = makeAlunoFromFormGroup(
      this.applyForm.value
    )
    this._professoresService.insertProfessor(professor).subscribe({
      next: (response: {id:string}) => {
        const userData: UserDataLocalStorage = {...response, ...professor}
        console.log(userData)
        this.localStorageService.setItem('userData', userData)
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
