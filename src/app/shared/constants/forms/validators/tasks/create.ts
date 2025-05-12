import { ValidatorFn, Validators } from '@angular/forms';
import { noWhitespaceValidator } from 'app/utils/functions/generalFunctions';

export const TITLE: ValidatorFn[] = [
  Validators.required,
  noWhitespaceValidator(),
  Validators.minLength(2),
  Validators.maxLength(100),
];

export const DESCRIPTION: ValidatorFn[] = [
  Validators.minLength(3),
  Validators.maxLength(500),
];
