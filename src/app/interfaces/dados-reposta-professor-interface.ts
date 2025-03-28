//TODO: ajustar todas as interfeces e types
import { EscolaInterface } from "./escola-interface";

export interface DadosRespostaProfessorInterface {
    nome: string;
    email: string;
    escola: EscolaInterface;
    telefone: string;
    turma: {
        nome:string;
        serie:string;
        _id:string;
    }
}