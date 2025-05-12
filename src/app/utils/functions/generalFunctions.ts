import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Esta funcion lo que hace es validar que las contraseñas sean iguales al momento de registrarse
 * @param control FormControl value
 * @returns ValidationsErrors | null
 */
export function matchPassword(control: AbstractControl): ValidationErrors | null {
  if (!control.parent) return null;
  const password = control.parent.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

/**
 * Validar que el formControl no sea solo texto
 * @returns ValidatoFn
 */
export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value?.toString().trim().length > 0;
    return isValid ? null : { whitespace: true };
  };
}