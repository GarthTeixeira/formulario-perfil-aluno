import { AlunoInterface } from "../interfaces/aluno-interface";
export class AlunoFormUtils {
    public static makeAlunoFormGroup = (aluno: AlunoInterface, _formBuilder: any) => {
        return {
            name: [aluno.nome],
            serie: [aluno.serie],
            email: [aluno.email],
            matricula: [aluno.matricula],
            anos_letivos: [aluno.anos_letivos]
        }
    }

    public static makeAlunoFromFormGroup = (formGroup: any): AlunoInterface => {
        return {
            nome: formGroup.name,
            serie: formGroup.serie,
            email: formGroup.email,
            matricula: "123456",
            anos_letivos: [1,2,3],
            escola: formGroup.escola
        }
    }

    private static getAnosLetivos = (serie: string): number[] => {
        const current_year: number = new Date().getFullYear();
        const serie_number = parseInt(serie.slice(0, 1));
        return Array.from({ length: serie_number }, (_, i) => current_year - i);
    }
}