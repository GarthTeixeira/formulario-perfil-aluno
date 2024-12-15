import { DadosRespostaProfessorInterface } from "../interfaces/dados-reposta-professor-interface";

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
