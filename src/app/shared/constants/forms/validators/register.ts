import { ValidatorFn, Validators } from '@angular/forms';
import { matchPassword, noWhitespaceValidator } from 'app/utils/functions/generalFunctions';

export const FULL_NAME: ValidatorFn[] = [
  Validators.required,
  noWhitespaceValidator(),
  Validators.maxLength(30),
  Validators.minLength(2),
];

export const EMAIL: ValidatorFn[] = [
  Validators.required,
  Validators.email,
  Validators.maxLength(30),
];

export const PASSWORD: ValidatorFn[] = [
  Validators.required,
  Validators.minLength(6),
];

export const CONFIRM_PASSWORD: ValidatorFn[] = [
  Validators.required,
  Validators.minLength(6),
  matchPassword,
];
