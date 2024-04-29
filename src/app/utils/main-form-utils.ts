import { CompetecenciasService } from "../services/competecencias.service";
import {map, mergeMap, toArray} from 'rxjs/operators';
import { Observable, from, merge } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Skill } from "../interfaces/skill-interface";
import { competenceFormGroup } from "../interfaces/competence-form-group-interface";
import { FormRespostaInterface } from "../interfaces/form-resposta-interface";


interface competenceModel {id: string, descricao_area: string, competencias_habilidades: string[]}

interface competenceFormModel {id: string, descricao: string, habilidades: Skill[]}



export  class MainFormUtils {

    public static skillLevels: string[] = ['high', 'basic', 'low'];

    private static aplicarRegraDeTres(valorAtual: number, minAtual: number, maxAtual: number, novoMinimo: number, novoMaximo: number): number {
        // Garantir que o valor atual esteja dentro do intervalo
        const valorNormalizado = Math.min(Math.max(valorAtual, minAtual), maxAtual);
    
        // Aplicar a regra de três
        const valorProporcional = ((valorNormalizado - minAtual) / (maxAtual - minAtual)) * (novoMaximo - novoMinimo) + novoMinimo;
    
        return valorProporcional;
    }

    private static makeQuestion = (habilitie: string) => {
        return `Como você avalia a habilidade de ${habilitie.replace(".","").trim()} ?`
    }

    private static makeSkill = (habilitie: string): Skill => {
        return {habiliteValue: habilitie, answerLevelValue:'', question: this.makeQuestion(habilitie)}
    }

    private static transformHabilitiesObjctToArray = (habilidades: any):string[] => {
        return Object.keys(habilidades).map((key: string) => habilidades[key])
    }

    private static processCompetence = ({id, descricao_area, competencias_habilidades}: competenceModel): competenceFormModel => {
        return {
            id: id,
            descricao: descricao_area,
            habilidades: this.transformHabilitiesObjctToArray(competencias_habilidades)
                .map((habilitie: string) => this.makeSkill(habilitie))
        }
    }

    private static makeCompetenceFormGroup = (competence: competenceFormModel,_formBuilder:FormBuilder): competenceFormGroup => {
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

    private static getCompetenceFormBuilderForCompetences = (competence:competenceFormModel, _formBuilder:FormBuilder): FormGroup => {
        return _formBuilder.group(this.makeCompetenceFormGroup(competence,_formBuilder))
      }
    
    private static competencesEmitterObservable(service:CompetecenciasService,tag:any): Observable<any> {  
        return service.getByArea(tag)
        .pipe(
            mergeMap((array: any[]) => from(array)),
        );
    }

    private static processEachCompetenceEmitted = (service:CompetecenciasService,tag:any):Observable<any> => {
        return this.competencesEmitterObservable(service, tag).pipe(
            map((competence: any) => this.processCompetence(competence)),
        )
    }

    public static getCompetences = (_formBuilder:FormBuilder,service:CompetecenciasService,tag:any):Observable<any> => {
        return this.processEachCompetenceEmitted(service,tag).pipe(toArray())
    }

    public static getQuestionarioFormGroup = (competencesArray:any[],_formBuilder:FormBuilder):FormGroup => {
        return _formBuilder.group({
            competences: _formBuilder.array(competencesArray.map(competence =>
              this.getCompetenceFormBuilderForCompetences(competence,_formBuilder)
            )
        )});
    }

    public static makeRespostaForm = (formValues: any): FormRespostaInterface => {
        const competencias:any = {}
        formValues.competencias.forEach((competencia: any) => {
            competencias[competencia.id] = competencia.value
        })
        return {
            disciplina: formValues.disciplina,
            competencias: competencias,
            aluno: formValues.aluno
        }
    }

}
