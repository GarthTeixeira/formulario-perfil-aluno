import { DadosRespostaProfessorInterface } from "../interfaces/dados-reposta-professor-interface";
import { Disciplina } from "../types/serviceTypes";

export function makeAlunoFromFormGroup (valueFormGroup: any): DadosRespostaProfessorInterface {
        return {
            nome: valueFormGroup.name,
            turma: valueFormGroup.turma,
            email: valueFormGroup.email,
            escola: valueFormGroup.escola
        }
    }

export function getAnoFromSerieString(serie:string):number {
        return parseInt(serie.slice(0, 1));
    }


export function getTituloFormatoDisciplinaNomeSerie(disciplina:Disciplina):string {
    return `${disciplina.name} - ${disciplina.serie_ano}° ano`
}