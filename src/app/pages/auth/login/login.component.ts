import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LOGIN_BUTTONS, LOGIN_INPUTS } from '@shared/constants/forms/loginInputs';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import { FormComponent } from "../../../shared/components/form/form.component";
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  public loginInputs: IOptionsInput[];
  public buttonsActions: IConfigActionButtons[]

  constructor() {
    this.loginInputs = LOGIN_INPUTS;
    this.buttonsActions = LOGIN_BUTTONS
  }

  onSubmit($form: FormGroup) {
    // Logic to uses services when request api
  }
}
