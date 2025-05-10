import { ValidatorFn, Validators } from "@angular/forms";

export const EMAIL: ValidatorFn[] = [
    Validators.required,
    Validators.maxLength(30),
    Validators.email
]

export const PASSWORD: ValidatorFn[] = [
    Validators.required,
]