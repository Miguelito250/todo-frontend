import { ValidatorFn, Validators } from "@angular/forms";

export const TITLE: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100),
]

export const DESCRIPTION: ValidatorFn[] = [
    Validators.minLength(3),
    Validators.maxLength(500),
]