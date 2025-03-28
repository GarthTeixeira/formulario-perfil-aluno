import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FormBuilder,  FormControl,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataSharedService } from '../../shared/data-shared.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DadosRespostaProfessorInterface } from '../../interfaces/dados-reposta-professor-interface';
import { makeAlunoFromFormGroup, formatarTelefone } from '../../utils/professor-form-utils';
import { FormProfessoresService } from '../../services/form-professores.service';
import { EscolasService } from '../../services/escolas.service';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { UserDataLocalStorage } from '../../types/localStorageTypes';
import { LoadingFormFieldComponent } from '../loading-form-field/loading-form-field.component';
import { phoneValidator } from '../../validators/phone.validator';
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
    LoadingFormFieldComponent
  ],
  templateUrl: './form-cadastro-aluno.component.html',
  styleUrl: './form-cadastro-aluno.component.scss'
})
export class FormCadastroAlunoComponent {

  public serieOptions: any[] = []

  public selectedSchool: any;

  public applyForm: FormGroup = new FormGroup({})

  public isSending: boolean = false

  public turmasOptions: any[] = []

  public loadingSchoolData:Observable<any> | null = null

  public errorLoadingSchools: boolean = false;

  public formatarTelefone = formatarTelefone;


  public sendData: (data: DadosRespostaProfessorInterface) => Observable<any> = this._professoresService.insertProfessor;

  constructor(
    private dataService: DataSharedService,
    private localStorageService: LocalStorageService,
    private router:Router, 
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _professoresService: FormProfessoresService,
    private _escolasService: EscolasService
  ) {
    this.loadingSchoolData = this._escolasService.getEscolasOptions()
  }

  get escolaControl(): FormControl {
    return this.applyForm.get('escola') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.applyForm.get('telefone') as FormControl;
  }

  get enableTurma(): boolean {
    return this.turmasOptions.length!=0
  }
  ngOnInit() {
    if(this.localStorageService.getItem('userData')){
      //TODO:realizar método para verificar se o usuário já está logado
      //this.router.navigate(['/areas'])
    }
    this.applyForm = this._formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      escola: ['', Validators.required],
      telefone: [null, phoneValidator()],
      turma: this._formBuilder.group({
        _id: [''],
        serie: [{value:'',disabled:true}, Validators.required],
        nome: ['', Validators.required]
      })
    })

    this.applyForm.get('escola')?.valueChanges.subscribe(this.onChangeEscola.bind(this))
    this.applyForm.get('turma.serie')?.valueChanges.subscribe(this.onChangeSerie.bind(this))
  }

  onChangeEscola(event: MatSelectChange){
    this.selectedSchool = this.applyForm.get('escola')?.value
    this.serieOptions = [ ... new Set(
      this.selectedSchool?.turmas.map((turma: any) => turma?.serie || '') || []
    )]
    if(this.serieOptions.length!=0)
      this.applyForm.get('turma.serie')?.enable();
  }

  onChangeSerie() {
    console.log("onChangeSerie")
    const value = this.applyForm.get('turma.serie')?.value
    this.turmasOptions = this.selectedSchool.turmas.filter((turma:any)=> turma.serie == value)
      
  }

  onChangeTurma(event: MatSelectChange){
    console.log("onChangeTurma")
    console.log(event)
    const turmaSelecionada = event.value
    if(!turmaSelecionada) return
    this.applyForm.get('turma')?.patchValue({
      _id: turmaSelecionada._id,
      nome: turmaSelecionada.nome
    })
  }

  //Improve performance
  trackById(index: number, item: any): number {
    return item.id;
  }

  protected submitAlunoForm() {
    this.isSending = true
    const professor:DadosRespostaProfessorInterface = this.applyForm.value
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
