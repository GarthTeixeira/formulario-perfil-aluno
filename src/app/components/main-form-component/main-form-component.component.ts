import { Component  } from '@angular/core';
import {FormBuilder, FormGroup ,  Validators, FormsModule, ReactiveFormsModule, AbstractControl} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import getCompetencesFromArray from '../../mocks/generateCompetencias';
import { MainFormUtils } from '../../utils/main-form-utils';
import { CompetecenciasService } from '../../services/competecencias.service';
import { map } from 'rxjs';
import { FormAlunosService } from '../../services/form-alunos.service';
import { DataSharedService } from '../../shared/data-shared.service';

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
  constructor(
    private formAlunosService: FormAlunosService , 
    private _formBuilder: FormBuilder, 
    private competenciasService:CompetecenciasService,
    private dataShared: DataSharedService,
    private router: Router
  ) {}

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
    const formValue = this.questionarioFormGroup.getRawValue();
    
    if (formValue) {
      const sendData = {
        'disciplina': this.itemSelecionado?.id, 
        'competencias': formValue.competences, 
        'aluno': this.dataShared.getData()
      }
      const resposta = MainFormUtils.makeRespostaForm(sendData);
      this.formAlunosService.insertResposta(resposta).subscribe({
        next: (response) => {

          console.log(response)
          stepper.reset();
          // go to previous route
          this.router.navigate(['/disciplinas'])
        },
        error: (error) => {
          console.error(error)
          stepper.reset();
        }
      })
      
    }
  }

 
}
