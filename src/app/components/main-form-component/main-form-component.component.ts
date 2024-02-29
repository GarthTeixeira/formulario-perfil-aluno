import { Component } from '@angular/core';
import {FormBuilder, FormGroup , FormArray, Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-form-component',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './main-form-component.component.html',
  styleUrl: './main-form-component.component.scss'
})
export class MainFormComponent{

  
  public questionarioFormGroup: FormGroup = this._formBuilder.group([]);

  public isLinear = false;

  get competences():any { return this.questionarioFormGroup?.get('competences'); }

  public iterableCompetences:any[] = []
  
  public getCompetencesFromArray = () => {
    const habilities = ['habilidade1', 'habilidade2', 'habilidade3']
    const competences = []
    for (let i = 0; i < 2; i++) {
      const habilidades = habilities.map(hability => `${hability}.${i}`)
      const competence = {descricao:`Competência ${i}`, habilidades: habilidades}
      competences.push(competence)
    }
    return competences
  }

  public getCompetenceFormBuilderForCompetences = (competences: any) => {
    return this._formBuilder.group({
      descricao:[competences.descricao, Validators.required],
      habilidades: this._formBuilder.array(competences.habilidades)
    })
  }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.iterableCompetences = this.getCompetencesFromArray()
    this.questionarioFormGroup = this._formBuilder.group({
      competences: this._formBuilder.array(this.iterableCompetences.map(competence =>
        this.getCompetenceFormBuilderForCompetences(competence)
      )
    )});
  }

 
}
