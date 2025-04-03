import { Register } from './serviceTypes';

export type DisciplinaSelectItem = {
  title: string;
  id: string;
  tag: string;
  color: string;
  lastRegister?: Register;
};

export type AreasSelectItem = {
  title: string;
  tag: string;
  color: string;
};
