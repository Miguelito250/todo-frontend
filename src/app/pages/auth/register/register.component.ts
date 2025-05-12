import { Component, inject } from '@angular/core';
import { type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormComponent } from '../../../shared/components/form/form.component';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import {
  REGISTER_BUTTONS,
  REGISTER_INPUTS,
} from '@shared/constants/forms/registerInputs';
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Register } from '@models/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly _authService: AuthService = inject(AuthService);

  public registerInputs: IOptionsInput[];
  public buttonsActions: IConfigActionButtons[];

  public successMessage: string = '';
  public errorMessage: string = '';

  constructor() {
    this.registerInputs = REGISTER_INPUTS;
    this.buttonsActions = REGISTER_BUTTONS;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      const formValue = form.value;

      // Creamos un nuevo objeto para no pasar con el ConfirmPassword
      const data: Register = {
        fullName: formValue.fullName,
        email: formValue.email,
        passwordHash: formValue.password,
      };

      this.errorMessage = '';
      this.successMessage = '';

      this._authService.register(data).subscribe({
        next: () => {
          this.successMessage = '¡Registro exitoso!';
        },
        error: (err) => {
          console.error('Error in register:', err);
          this.errorMessage =
            'Hubo un error, revisa que no este el correo repetido';
        },
      });
    }
  }
}
