import { Component  } from '@angular/core';
import {FormBuilder, FormGroup ,  Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import getCompetencesFromArray from '../../mocks/generateCompetencias';

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
    RouterModule,
    CommonModule
  ],
  templateUrl: './main-form-component.component.html',
  styleUrl: './main-form-component.component.scss'
})
export class MainFormComponent{

  public itemSelecionado: {tag:string, title:string, color:string, id: string} | undefined = {tag:'', title:'', color:'', id:''};

  public disiplnaSelecionada:string = '';

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

  public formTitle (competenceDescription: any) {
    return `${this.itemSelecionado?.title} - ${competenceDescription}`
  }

  public test =  () => { console.log('teste') }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    const {tag , title, color, id} = history.state.itemData;
    this.itemSelecionado = {tag, title, color, id}

    this.iterableCompetences = getCompetencesFromArray(5);
    console.log(this.iterableCompetences)
    
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
