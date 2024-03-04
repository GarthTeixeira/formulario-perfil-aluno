import { Component, EnvironmentInjector } from '@angular/core';
import {FormBuilder, FormGroup , FormArray, Validators, FormsModule, ReactiveFormsModule, AbstractControl, FormControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

interface Skill {
  habiliteValue: string;
  answerLevelValue: string;
  question: string;
}


interface IDictionarySkill<TValue> {
  [id: string]: TValue;
}

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
    CommonModule
  ],
  templateUrl: './main-form-component.component.html',
  styleUrl: './main-form-component.component.scss'
})
export class MainFormComponent{

  
  public questionarioFormGroup: FormGroup = this._formBuilder.group([]);

  public isLinear = true;

  public getSkillLevelsAswer:IDictionarySkill<string> = {'high':'Alto', 'basic':'Medio', 'low':'Baixo'}

  public aplicarRegraDeTres(valorAtual: number, minAtual: number, maxAtual: number, novoMinimo: number, novoMaximo: number): number {
    // Garantir que o valor atual esteja dentro do intervalo
    const valorNormalizado = Math.min(Math.max(valorAtual, minAtual), maxAtual);

    // Aplicar a regra de três
    const valorProporcional = ((valorNormalizado - minAtual) / (maxAtual - minAtual)) * (novoMaximo - novoMinimo) + novoMinimo;

    return valorProporcional;
  }

  public getSkillLevelsAswerNumberValue = (skill:string) => {
    const atualMax:number = this.skillLevelsOptions.length;
    const atualMin:number = 1;

    const atualValue:number = this.skillLevelsOptions.indexOf(skill) + 1;

    return this.aplicarRegraDeTres(atualValue, atualMin, atualMax, 1, 10)
  }

  get competences():any { return this.questionarioFormGroup?.get('competences'); }

  get skillLevelsOptions():string[] { return ['high', 'basic', 'low']} 

  public iterableCompetences:any[] = []
  
  public getCompetencesFromArray = () => {
    const habilities = ['habilidade1', 'habilidade2', 'habilidade3']
    const competences = []
    for (let i = 0; i < 2; i++) {
      const habilidades = habilities.map(hability => `${hability}.${i}`)
      const competence = {id:i, descricao:`Competência ${i}`, habilidades: habilidades}
      competences.push(competence)
    }
    return competences
  }

  public getCompetenceFormBuilderForCompetences = (competences: any) => {
    return this._formBuilder.group({
      id: [competences.id],
      descricao:[competences.descricao, Validators.required],
      habilidades: this._formBuilder.array([...Array(competences.habilidades.length)].map(() => ''), Validators.required)
    })
  }

  private makeQuestion = (habilitie: string) => {
    return `Como você avalia a habilidade de ${habilitie} ?`
  }

  public makeSkill = (habilitie: string): Skill => {
    return {habiliteValue: habilitie, answerLevelValue:'', question: this.makeQuestion(habilitie)}
  }



  public test() {
    // console.log(this.questionarioFormGroup)
  }



  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.iterableCompetences = []
    this.questionarioFormGroup = this._formBuilder.group({
      competences: this._formBuilder.array(this.iterableCompetences.map(competence =>
        this.getCompetenceFormBuilderForCompetences(competence)
      )
    )});
  }

  onSubmit(stepper: any) {
    console.log ((this.questionarioFormGroup.getRawValue()));
    stepper.reset();
  }

 
}
