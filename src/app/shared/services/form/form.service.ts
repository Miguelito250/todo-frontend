import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ErrorMessageFunction } from '@shared/types/errorMessages';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private readonly defaultErrorMessages: Record<string, ErrorMessageFunction>;

  constructor() {
    this.defaultErrorMessages = {
      required: () => 'Este campo es obligatorio.',
      minlength: (error) =>
        `Debe tener mínimo ${error.requiredLength} caracteres.`,
      maxlength: (error) =>
        `Debe tener máximo ${error.requiredLength} caracteres.`,
      email: () => 'Debe ser un correo válido.',
      max: (error) => `Debe ser menor o igual a ${error.max}.`,
      min: (error) => `Debe ser mayor o igual a ${error.min}.`,
      minDifference: (error) =>
        `Debe de ser mayor de ${error.requiredMinValue} años.`,
      maxDifference: (error) =>
        `No puede ser mayor a ${error.requiredMaxValue} `,
      passwordMismatch: (error) => `Las contraseñas deben de coincidir.`
    };
  }

  public getErrorMessages(control: AbstractControl | null): string[] {
    if (!control || !control.errors || !control.touched) return [];

    const errors: ValidationErrors = control.errors;
    
    return Object.keys(errors).map((key) => {
      const error = errors[key];
      const getMessage = this.defaultErrorMessages[key];
      return getMessage ? getMessage(error) : 'Error no especificado.';
    });
  }
}
