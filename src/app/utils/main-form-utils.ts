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

    static skillLevels: string[] = ['high', 'basic', 'low'];

    public static getSkillLevelsAswer:IDictionarySkill<string> = {'high':'Alto', 'basic':'Medio', 'low':'Baixo'}

    public static aplicarRegraDeTres(valorAtual: number, minAtual: number, maxAtual: number, novoMinimo: number, novoMaximo: number): number {
        // Garantir que o valor atual esteja dentro do intervalo
        const valorNormalizado = Math.min(Math.max(valorAtual, minAtual), maxAtual);
    
        // Aplicar a regra de três
        const valorProporcional = ((valorNormalizado - minAtual) / (maxAtual - minAtual)) * (novoMaximo - novoMinimo) + novoMinimo;
    
        return valorProporcional;
    }

    public static makeQuestion = (habilitie: string) => {
        return `Como você avalia a habilidade de ${habilitie} ?`
    }

    public static makeSkill = (habilitie: string): Skill => {
        return {habiliteValue: habilitie, answerLevelValue:'', question: this.makeQuestion(habilitie)}
    }

    public static processCompetence = ({id, descricao, habilidades}: {id: string, descricao: string, habilidades: string[]}): competenceFormModel => {
        return {
            id: id,
            descricao: descricao,
            habilidades: habilidades.map((habilitie: string) => this.makeSkill(habilitie))
        }
    }

    public static makeCompetenceFormGroup = (competence: competenceFormModel,_formBuilder:FormBuilder): competenceFormGroup => {
        return {
            id: [competence.id],
            descricao: [competence.descricao, Validators.required],
            habilidades:_formBuilder.array([...Array(competence.habilidades.length)].map(() => ''), Validators.required)
        }
    }
    
    public static getSkillLevelsAswerNumberValue = (skill:string) => {
        const atualMax:number = this.skillLevels.length;
        const atualMin:number = 1;

        const atualValue:number = this.skillLevels.indexOf(skill) + 1;

        return this.aplicarRegraDeTres(atualValue, atualMin, atualMax, 1, 10)
    }

    get skillLevelsOptions():string[] { return ['high', 'basic', 'low']} 

    public static getCompetenceFormBuilderForCompetences = (competence:competenceFormModel, _formBuilder:FormBuilder) => {
        return _formBuilder.group(this.makeCompetenceFormGroup(competence,_formBuilder))
      }
    
    public static competencesEmitterObservable(service:CompetecenciasService,tag:any): Observable<any> {  
        return service.getByArea(tag)
        .pipe(
            mergeMap((array: any[]) => from(array)),
        );
    }

    public static processEachCompetenceEmitted = (_formBuilder:FormBuilder,service:CompetecenciasService,tag:any):Observable<any> => {
        return this.competencesEmitterObservable(service, tag).pipe(
            map((competence: any) => this.processCompetence(competence)),
            map((competence:competenceFormModel) => this.getCompetenceFormBuilderForCompetences(competence,_formBuilder))
        )
    }

    public static getCompetences = (_formBuilder:FormBuilder,service:CompetecenciasService,tag:any):Observable<any> => {
        return this.processEachCompetenceEmitted(_formBuilder,service,tag).pipe(toArray())
    }

}
