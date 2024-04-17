import { CompetecenciasService } from "../services/competecencias.service";
import {map, mergeMap, toArray} from 'rxjs/operators';
import { Observable, from, merge } from 'rxjs';
import { FormArray, FormBuilder, Validators } from "@angular/forms";

interface Skill {
    habiliteValue: string;
    answerLevelValue: string;
    question: string;
  }

interface IDictionarySkill<TValue> {
    [id: string]: TValue;
  }

interface competenceFormModel {id: string, descricao: string, habilidades: Skill[]}

interface competenceFormGroup{
    id:any,
    descricao:any,
    habilidades:FormArray<any> 
}

export class MainFormUtils {

    private skillLevels: string[] = ['high', 'basic', 'low'];

    private getSkillLevelsAswer:IDictionarySkill<string> = {'high':'Alto', 'basic':'Medio', 'low':'Baixo'}

    public aplicarRegraDeTres(valorAtual: number, minAtual: number, maxAtual: number, novoMinimo: number, novoMaximo: number): number {
        // Garantir que o valor atual esteja dentro do intervalo
        const valorNormalizado = Math.min(Math.max(valorAtual, minAtual), maxAtual);
    
        // Aplicar a regra de três
        const valorProporcional = ((valorNormalizado - minAtual) / (maxAtual - minAtual)) * (novoMaximo - novoMinimo) + novoMinimo;
    
        return valorProporcional;
    }

    public makeQuestion = (habilitie: string) => {
        return `Como você avalia a habilidade de ${habilitie} ?`
    }

    public makeSkill = (habilitie: string): Skill => {
        return {habiliteValue: habilitie, answerLevelValue:'', question: this.makeQuestion(habilitie)}
    }

    public processCompetence = ({id, descricao, habilidades}: {id: string, descricao: string, habilidades: string[]}): competenceFormModel => {
        return {
            id: id,
            descricao: descricao,
            habilidades: habilidades.map((habilitie: string) => this.makeSkill(habilitie))
        }
    }

    public makeCompetenceFormGroup = (competence: competenceFormModel,_formBuilder:FormBuilder): competenceFormGroup => {
        return {
            id: [competence.id],
            descricao: [competence.descricao, Validators.required],
            habilidades:_formBuilder.array([...Array(competence.habilidades.length)].map(() => ''), Validators.required)
        }
    }
    
    public getSkillLevelsAswerNumberValue = (skill:string) => {
        const atualMax:number = this.skillLevelsOptions.length;
        const atualMin:number = 1;

        const atualValue:number = this.skillLevelsOptions.indexOf(skill) + 1;

        return this.aplicarRegraDeTres(atualValue, atualMin, atualMax, 1, 10)
    }

    get skillLevelsOptions():string[] { return ['high', 'basic', 'low']} 

    public getCompetenceFormBuilderForCompetences = (competence:competenceFormModel, _formBuilder:FormBuilder) => {
        return _formBuilder.group(this.makeCompetenceFormGroup(competence,_formBuilder))
      }
    
    private competencesEmitterObservable(service:CompetecenciasService,tag:any): Observable<any> {  
        return service.getByArea(tag)
        .pipe(
            mergeMap((array: any[]) => from(array)),
        );
    }

    private processEachCompetenceEmitted = (_formBuilder:FormBuilder,service:CompetecenciasService,tag:any):Observable<any> => {
        return this.competencesEmitterObservable(service, tag).pipe(
            map((competence: any) => this.processCompetence(competence)),
            map((competence:competenceFormModel) => this.getCompetenceFormBuilderForCompetences(competence,_formBuilder))
        )
    }

    public getCompetences = (_formBuilder:FormBuilder,service:CompetecenciasService,tag:any):Observable<any> => {
        return this.processEachCompetenceEmitted(_formBuilder,service,tag).pipe(toArray())
    }

}
