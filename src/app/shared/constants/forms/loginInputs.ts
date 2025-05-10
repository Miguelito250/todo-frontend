import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import { EMAIL, PASSWORD } from './validators/login';
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';

export const LOGIN_INPUTS: IOptionsInput[] = [
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'email',
    label: 'email',
    placeholder: 'Correo Electronico',
    type: 'email',
    value: '',
    name: 'email',
    readonly: false,
    validator: EMAIL,
  },
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'password',
    label: 'password',
    placeholder: 'Contraseña',
    type: 'password',
    value: '',
    name: 'password',
    readonly: false,
    validator: PASSWORD,
  },
];

export const LOGIN_BUTTONS: IConfigActionButtons[] = [
  {
    width: 'row-start-5 mt-3 h-full',
    textToShow: 'Iniciar sesión',
    action: 'action-continue__proccess',
    type: 'submit',
  },
];
