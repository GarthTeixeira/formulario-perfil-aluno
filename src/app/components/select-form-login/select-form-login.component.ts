import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EscolasService } from '../../services/escolas.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormProfessoresService } from '../../services/form-professores.service';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { UserDataLocalStorage } from '../../types/localStorageTypes';
import { getAnoFromSerieString } from '../../utils/professor-form-utils'
import { LoadingFormFieldComponent } from '../loading-form-field/loading-form-field.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-form-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule, 
    MatIconModule, 
    MatButtonModule,
    ReactiveFormsModule,
    LoadingFormFieldComponent
  ],
  templateUrl: './select-form-login.component.html',
  styleUrl: './select-form-login.component.scss'
})
export class SelectFormLoginComponent implements OnInit{

  public escolasOptions: {name: string, id: any, turmas:{nome:string, id: string, serie: string}[] }[] = []

  public selectedSchool: any;

  public selectedSerie: string = ''

  public applyForm: FormGroup = new FormGroup({})

  public formOptions:UserDataLocalStorage[] = [];

  public serieOptions:string []  = []

  public turmasOptions:any [] = []

  public loadingSchoolData:Observable<any> | null = null

  public selectedForm:UserDataLocalStorage | null = null;

  constructor(
    private _escolasService:EscolasService,
    private formProfessoresService: FormProfessoresService , 
    private localStorageService: LocalStorageService,
    private _formBuilder: FormBuilder,
    private router: Router
  ){}

   get escolaControl(): FormControl {
      return this.applyForm.get('escola') as FormControl;
    }
  
  ngOnInit(): void {
    this.applyForm = this._formBuilder.group({ 
          formulario: [{value:null, disabled:true}, Validators.required],
          escola: [{}, Validators.required],
          serie: [{value:'', disabled:true}, Validators.required],
          turma: [{value:null, disabled:true}, Validators.required],
        })
    
    this.loadingSchoolData = this._escolasService.getEscolasOptions()

    this.applyForm.get('escola')?.valueChanges.subscribe(this.onChangeSchool.bind(this))
    this.applyForm.get('serie')?.valueChanges.subscribe(this.onChangeSerie.bind(this))
    this.applyForm.get('turma')?.valueChanges.subscribe(this.onChangeTurma.bind(this))
    this.applyForm.get('formulario')?.valueChanges.subscribe(this.onChangeForm.bind(this))
  }

  onChangeSchool(value:any){
    console.log("onChangeSchool")
    this.serieOptions = [... new Set<string>(value['turmas'].map((turma:any)=>turma.serie))]
    if(this.serieOptions && this.serieOptions.length!=0)
      this.applyForm.get("serie")?.enable()
  }

  onChangeSerie(value:any){
    console.log("onChangeSerie", value)
    if (this.applyForm.value['escola'] && value){
      this.turmasOptions = this.applyForm.value['escola'].turmas
        .filter((turma:any) =>getAnoFromSerieString(turma.serie) == getAnoFromSerieString(value))
      
      if(this.applyForm.get('turma')?.enabled) {
        this.applyForm.get('turma')?.setValue(null)
        this.applyForm.get('turma')?.disable()
      }

      if(this.turmasOptions && this.turmasOptions.length!=0){}
        this.applyForm.get("turma")?.enable()
    }
  }

  onChangeTurma(value:any){
    if(this.applyForm.get('formulario')?.enabled) {
      this.applyForm.get('formulario')?.setValue(null) 
      this.applyForm.get('formulario')?.disable()
    }
    if (this.applyForm.value['escola'] && !!value){
      this.fetchSchoolForms(value._id)
    }
  }

  onChangeForm(value:UserDataLocalStorage){
    this.selectedForm = value
  }
  
  fetchSchoolForms(turmaId: string){
    this.formProfessoresService.getFormulariosBySchool(this.applyForm.value['escola'].id).subscribe({
      next:(response) => {
        this.selectedForm = null
        if(response?.length == 0)
          window.alert("Não há formulários cadastrados ainda") // trocar por uma dialog de alerta/ fazer componentes de alerta
        else {
          console.log(turmaId)
          const formsOfTurma = response
            .filter((form:any) => form.turma === turmaId)
            .map((form:any):UserDataLocalStorage =>this.passToUserDataLocalStorage(form))
          if(formsOfTurma.length == 0)
            window.alert("Não há formularios referentes a essa turma")
          else{ 
            this.formOptions =formsOfTurma
            this.applyForm.get('formulario')?.enable()
          }
        }
      },
      error: (error)=>{
        console.error(error)
      }
    })
  }

  passToUserDataLocalStorage(data:any):UserDataLocalStorage {
    const newId = data['formulario']
    delete data['formulario']
    data['escola'] = this.applyForm.value['escola']
    data['turma'] = this.applyForm.value['escola'].turmas.find((turma:any)=>turma['_id'] === data['turma'])
    return {...data, id: newId}
  }

  onSubmit(){
    this.localStorageService.setItem('userData',this.selectedForm)
    this.router.navigate(['/areas'])
  }
}
