import { AlunoInterface } from "../interfaces/aluno-interface";
import { DadosRespostaProfessorInterface } from "../interfaces/dados-reposta-professor-interface";
export class ProfessorFormUtils {
    public static makeAlunoFormGroup = (professor: DadosRespostaProfessorInterface, _formBuilder: any) => {
        return {
            name: [professor.nome],
            email: [professor.email],
            turma: [professor.turma],
            escola: [professor.escola],
            ano_referencia: [professor.ano_referencia]
        }
    }

    public static makeAlunoFromFormGroup = (formGroup: any): DadosRespostaProfessorInterface => {
        return {
            nome: formGroup.name,
            turma: formGroup.turma,
            email: formGroup.email,
            ano_referencia: formGroup.ano_referencia,
            escola: formGroup.escola
        }
    }

    private static getAnosLetivos = (serie: string): number[] => {
        const current_year: number = new Date().getFullYear();
        const serie_number = parseInt(serie.slice(0, 1));
        return Array.from({ length: serie_number }, (_, i) => current_year - i);
    }
}