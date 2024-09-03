export type Turma = {
    _id:string;
    serie:string;
    nome:string;
}
export type UserDataLocalStorage = {
    id: string;
    nome: string;
    escola:string;
    email:string;
    turma:Turma
  };