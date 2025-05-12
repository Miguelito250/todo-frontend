import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPassword(control: AbstractControl): ValidationErrors | null {
  if (!control.parent) return null;
  const password = control.parent.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value?.toString().trim().length > 0;
    return isValid ? null : { whitespace: true };
  };
}