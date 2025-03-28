export interface EscolaInterface {
    id: string, 
    nome: string, 
    turmas: {
        nome:string, 
        _id: string, 
        serie: string
    } []
}