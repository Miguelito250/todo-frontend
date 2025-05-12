import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  LOGIN_BUTTONS,
  LOGIN_INPUTS,
} from '@shared/constants/forms/loginInputs';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import { FormComponent } from '../../../shared/components/form/form.component';
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Login } from '@models/login.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  public errorMessage: string = '';

  // Para mas información sobre los inputs dinamicos vaya a la documentacion del app-form

  public loginInputs: IOptionsInput[];
  public buttonsActions: IConfigActionButtons[];

  constructor() {
    this.loginInputs = LOGIN_INPUTS;
    this.buttonsActions = LOGIN_BUTTONS;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const formValue = form.value;

      // Creamos un nuevo objeto para poder pasar a la api
      const dataLogin: Login = {
        email: formValue.email,
        password: formValue.password,
      };

      this._authService.login(dataLogin).subscribe({
        next: () => this._router.navigate(['/dashboard']),
        error: () => (this.errorMessage = 'Credenciales incorrectas'),
      });
    }
  }
}
