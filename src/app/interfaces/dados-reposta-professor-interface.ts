export interface DadosRespostaProfessorInterface {
    nome: string;
    email: string;
    escola: string;
    turma: {
        nome:string;
        serie:string;
        id:string;
    }
    ano_escolar: number;
}