import { CompetecenciasService } from "../services/competecencias.service";
import {concatMap, map, mergeMap, toArray} from 'rxjs/operators';
import { ArgumentOutOfRangeError, Observable, from, merge } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Skill } from "../interfaces/skill-interface";
import { competenceFormGroup } from "../interfaces/competence-form-group-interface";
import { FormRespostaInterface } from "../interfaces/form-resposta-interface";


type CompetenceAreaModel = {id: string, descricao_area: string, competencias_habilidades: string[]}

type CompetenceCognitiveModel = {id: string, descricao: string}

type CompetenceAreaFormModel = {id: string, descricao: string, habilidades: Skill[]}

type CompetenceCognitiveFormModel = {id: string, descricao_pergunta: string, resposta: string}


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

    private static processAreaCompetence = ({id, descricao_area, competencias_habilidades}: CompetenceAreaModel): CompetenceAreaFormModel => {
        return {
            id: id,
            descricao: descricao_area,
            habilidades: this.transformHabilitiesObjctToArray(competencias_habilidades)
                .map((habilitie: string) => this.makeSkill(habilitie))
        }
    }

    private static processCognitiveCompetence = ({id, descricao}: CompetenceCognitiveModel): CompetenceCognitiveFormModel => {
        return {
            id: id,
            descricao_pergunta: this.makeQuestion(descricao),
            resposta: ''
        }
    }

    private static makeCompetenceFormGroup = (competence: CompetenceAreaFormModel,_formBuilder:FormBuilder): competenceFormGroup => {
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

    private static getCompetenceFormBuilderForCompetences = (competence:CompetenceAreaFormModel, _formBuilder:FormBuilder): FormGroup => {
        return _formBuilder.group(this.makeCompetenceFormGroup(competence,_formBuilder))
      }

    private static getCompetenceFormBuilderForCognitive = (competence:CompetenceCognitiveFormModel, _formBuilder:FormBuilder): FormGroup => {
        return _formBuilder.group({
            id: [competence.id],
            descricao_pergunta: [competence.descricao_pergunta, Validators.required],
            resposta: [competence.resposta, Validators.required]
        })
    }
    
    //faz com que cada competencia seja emitida individualmente
    private static competencesEmitterObservable(service:CompetecenciasService,areaTag:any): Observable<any> {  
        return service.getByArea(areaTag)
        .pipe(
            mergeMap((array: any[]) => from(array)),
        );
    }

    private static cognitiveEmitterObservable(service:CompetecenciasService): Observable<any> {
        return service.getCognitive()
        .pipe(
            mergeMap((array: any[]) => from(array)),
        );
    }

    private static processEachCompetenceEmitted = (service:CompetecenciasService,tag:any):Observable<CompetenceAreaFormModel> => {
        return this.competencesEmitterObservable(service, tag).pipe(
            map((competence: CompetenceAreaModel) => this.processAreaCompetence(competence)),
        )
    }
    private static processEachCognitiveEmitted = (service:CompetecenciasService):Observable<CompetenceCognitiveFormModel> => {
        return this.cognitiveEmitterObservable(service).pipe(
            map((competence: CompetenceCognitiveModel) => this.processCognitiveCompetence(competence)),
        )
    }

    public static getCompetences = (_formBuilder:FormBuilder,service:CompetecenciasService,tag:any):Observable<CompetenceAreaFormModel []> => {
        return this.processEachCompetenceEmitted(service,tag).pipe(toArray())
    }

    public static getCognitiveCompetences = (_formBuilder:FormBuilder,service:CompetecenciasService):Observable<CompetenceCognitiveFormModel []> => {
        return this.processEachCognitiveEmitted(service).pipe(toArray())
    }

    public static getQuestionarioFormGroup = (competencesArray: any [] ,_formBuilder:FormBuilder):FormGroup => {
        //check if competencesArray is an CompetenceAreaFormModel array
        if (competencesArray.every((competece) => 'habilidades' in competece)) {
            return _formBuilder.group({
                competences: _formBuilder.array(competencesArray.map(competence =>
                  this.getCompetenceFormBuilderForCompetences(competence,_formBuilder)
                )
            )});

        }

        return _formBuilder.group({
            competences: _formBuilder.array(competencesArray.map(competence =>
              this.getCompetenceFormBuilderForCognitive(competence,_formBuilder)
            )
        )});
    }

    public static makeRespostaForm = (formValues: any): FormRespostaInterface => {
        const competenciasDict:any = {}
        const { disciplina, professor, area } = formValues;

        formValues.competencias.forEach((competencia: any) => {
            const arrayResposta = area != 'COGNITIVOS'
            ? competencia.habilidades
            : [competencia.resposta]
            
            if (arrayResposta || arrayResposta.some((resposta:any) => resposta == null || resposta == undefined))
                throw Error("respostas invalidas")
            
            competenciasDict[competencia.id] = arrayResposta;
        })
       
        return {
            disciplina,
            competencias: competenciasDict,
            professor,
            area
        }
    }

}
