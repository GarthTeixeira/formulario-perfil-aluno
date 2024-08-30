import { AlunoInterface } from "../interfaces/aluno-interface";
import { DadosRespostaProfessorInterface } from "../interfaces/dados-reposta-professor-interface";
export class ProfessorFormUtils {
    // public static makeAlunoFormGroup = (professor: DadosRespostaProfessorInterface, _formBuilder: any) => {
    //     return {
    //         name: [professor.nome],
    //         email: [professor.email],
    //         turma: [professor.turma],
    //         escola: [professor.escola],
    //         ano_escolar: [professor.ano_escolar]
    //     }
    // }

    public static makeAlunoFromFormGroup = (valueFormGroup: any): DadosRespostaProfessorInterface => {
        return {
            nome: valueFormGroup.name,
            turma: valueFormGroup.turma,
            email: valueFormGroup.email,
            ano_escolar: valueFormGroup.ano_escolar,
            escola: valueFormGroup.escola
        }
    }

    private static getAnosLetivos = (serie: string): number[] => {
        const current_year: number = new Date().getFullYear();
        const serie_number = parseInt(serie.slice(0, 1));
        return Array.from({ length: serie_number }, (_, i) => current_year - i);
    }
}