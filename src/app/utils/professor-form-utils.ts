import { AbstractControl, FormGroup } from '@angular/forms';
import { DadosRespostaProfessorInterface } from '../interfaces/dados-reposta-professor-interface';
import { Disciplina } from '../types/serviceTypes';

export function getAnoFromSerieString(serie: string): number {
  return parseInt(serie.slice(0, 1));
}

export function getTituloFormatoDisciplinaNomeSerie(
  disciplina: Disciplina
): string {
  return `${disciplina.nome} - ${disciplina.serie_ano}° ano`;
}

export function formatarTelefone(
  event: any,
  formulario: AbstractControl<any> | null
): void {
  const input = event.target as HTMLInputElement;
  let value = '';
  const rawValue = input.value.replace(/\D/g, '');
  console.log(formulario?.get('telefone')?.value);

  // Aplica a máscara
  if (rawValue.length > 0) {
    value = `(${rawValue.substring(0, 2)}`;
    if (rawValue.length > 2) {
      value += `) ${rawValue.substring(2, 6)}`;
      if (rawValue.length > 6) {
        value += `-${rawValue.substring(6, 10)}`;
        if (rawValue.length >= 11) {
          value = `(${rawValue.substring(0, 2)}) ${rawValue.substring(
            2,
            7
          )}-${rawValue.substring(7, 11)}`;
        }
      }
    }
  }

  input.value = value;
  formulario
    ?.get('telefone')
    ?.setValue(value ? value.replace(/\D/g, '') : null);
}
