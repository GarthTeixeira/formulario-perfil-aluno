type Register = {
  professor: string;
  tipo: string;
  ultima_resposta: string;
};

export type TypeDisciplinaRegister = {
  id: string;
  nome: string;
  register: Register[];
};

export type Disciplina = {
  area: string;
  codigoBNCC: string;
  id: string;
  nome: string;
  serie_ano: number;
};
