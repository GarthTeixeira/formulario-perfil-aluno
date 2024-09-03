import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EscolasService } from '../../services/escolas.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormProfessoresService } from '../../services/form-professores.service';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';
import { UserDataLocalStorage } from '../../types/types';
import { DadosRespostaProfessorInterface } from '../../interfaces/dados-reposta-professor-interface';

@Component({
  selector: 'app-select-form-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatSelectModule, 
    FormsModule, 
    MatIconModule, 
    MatButtonModule, 
    RouterLink
  ],
  templateUrl: './select-form-login.component.html',
  styleUrl: './select-form-login.component.scss'
})
export class SelectFormLoginComponent implements OnInit{

  public escolasOptions: {name: string, id: any, turmas:{nome:string, id: string, serie: string}[] }[] = []

  public selectedSchool: any;

  public formOptions:any[] = [];

  public selectedForm:any | null = null;

  constructor(
    private _escolasService:EscolasService,
    private formProfessoresService: FormProfessoresService , 
    private localStorageService: LocalStorageService,
    private router: Router
  ){}

  ngOnInit(): void {
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
    
    this.formProfessoresService.getFormulariosBySchool(this.selectedSchool.id).subscribe({
      next:(response) => {
        this.selectedForm = null
        this.formOptions = response.map((form:any)=>form.professor)
      },
      error: (error)=>{
        console.error(error)
      }
    })
  }

  onSubmit(){
    const userData:UserDataLocalStorage = {
      id:this.selectedForm.id,
      ...this.selectedForm.professor
    }
    this.localStorageService.setItem('userData',userData)
    this.router.navigate(['/areas'])
  }
}
