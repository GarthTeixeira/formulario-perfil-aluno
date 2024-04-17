import { Component  } from '@angular/core';
import {FormBuilder, FormGroup ,  Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import getCompetencesFromArray from '../../mocks/generateCompetencias';
import { MainFormUtils } from '../../utils/main-form-utils';
import { CompetecenciasService } from '../../services/competecencias.service';
import { map } from 'rxjs';

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

  public getSkillLevelsAswerNumberValue(skill:string) {
    return MainFormUtils.getSkillLevelsAswerNumberValue(skill)
  }

  get competences():AbstractControl<any, any> | any { return this.questionarioFormGroup?.get('competences') || []; }

  get skillLevelsOptions():string[] { return MainFormUtils.skillLevels } 

  public iterableCompetences:any[] = []
  
  public formTitle (competenceDescription: any) {
    return `${this.itemSelecionado?.title} - ${competenceDescription}`
  }
  constructor(private _formBuilder: FormBuilder, private competenciasService:CompetecenciasService) {}

  ngOnInit(): void {
    const {tag , title, color, id} = history.state.itemData;
    this.itemSelecionado = {tag, title, color, id}

    MainFormUtils.getCompetences(this._formBuilder,this.competenciasService, tag)
      .subscribe((competencesFromArray: any) => {
        console.log(competencesFromArray)
        this.iterableCompetences = competencesFromArray
        this.questionarioFormGroup = MainFormUtils.getQuestionarioFormGroup(this.iterableCompetences,this._formBuilder);
        console.log(this.questionarioFormGroup)
      })
    
  }

  onSubmit(stepper: any) {
    console.log ((this.questionarioFormGroup.getRawValue()));
    stepper.reset();
  }

 
}
