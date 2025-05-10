import { AbstractControl, ValidationErrors } from "@angular/forms";

export function matchPassword(control: AbstractControl): ValidationErrors | null {
  if (!control.parent) return null;
  const password = control.parent.get('password')?.value;
  const confirmPassword = control.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
}