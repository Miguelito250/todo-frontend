import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import { CONFIRM_PASSWORD, EMAIL, FULL_NAME, PASSWORD } from './validators/register';

export const REGISTER_INPUTS: IOptionsInput[] = [
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'fullname',
    label: 'Nombre Completo',
    placeholder: 'Nombre completo',
    type: 'text',
    value: '',
    name: 'fullname',
    readonly: false,
    validator: FULL_NAME
  },
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'email',
    label: 'Correo electronico',
    placeholder: 'Correo electronico',
    type: 'email',
    value: '',
    name: 'email',
    readonly: false,
    validator: EMAIL
  },
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'password',
    label: 'Contraseña',
    placeholder: 'Contraseña',
    type: 'password',
    value: '',
    name: 'password',
    readonly: false,
    validator: PASSWORD
  },
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'confirmPassword',
    label: 'Confirmar Contraseña',
    placeholder: 'Confirmar contraseña',
    type: 'password',
    value: '',
    name: 'confirmPassword',
    readonly: false,
    validator: CONFIRM_PASSWORD
  },
];

export const REGISTER_BUTTONS: IConfigActionButtons[] = [
  {
    width: 'row-start-5 mt-3 h-full',
    textToShow: 'Crear cuenta',
    action: 'action-continue__proccess',
    type: 'submit',
  },
];
