//TODO: ajustar todas as interfeces e types
export interface DadosRespostaProfessorInterface {
    nome: string;
    email: string;
    escola: string;
    turma: {
        nome:string;
        serie:string;
        _id:string;
    }
}