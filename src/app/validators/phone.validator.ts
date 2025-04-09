import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) return null;

    const digits = value.replace(/\D/g, '');
    const isValid = /^(\d{10,11})$/.test(digits);

    return isValid ? null : { invalidPhone: true };
  };
}
