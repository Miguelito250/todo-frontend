import { Component, inject } from '@angular/core';
import {
  
  type FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormComponent } from '../../../shared/components/form/form.component';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import {
  REGISTER_BUTTONS,
  REGISTER_INPUTS,
} from '@shared/constants/forms/registerInputs';
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  public registerInputs: IOptionsInput[];
  public buttonsActions: IConfigActionButtons[];

  constructor() {
    this.registerInputs = REGISTER_INPUTS;
    this.buttonsActions = REGISTER_BUTTONS;
  }

  onSubmit($form: FormGroup) {
    console.log("Hola esto es el formulario de registro", $form)
  }
}
