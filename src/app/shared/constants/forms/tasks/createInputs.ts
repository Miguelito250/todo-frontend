import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import { DESCRIPTION, TITLE } from '../validators/tasks/create';

export const CREATE_INPUTS: IOptionsInput[] = [
  {
    width: '',
    id: 'id',
    label: '',
    placeholder: '',
    type: 'hidden',
    value: '',
    name: 'id',
    readonly: true,
    labelClass: 'null',
  },
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'title',
    label: 'Título',
    placeholder: 'Título',
    type: 'text',
    value: '',
    name: 'title',
    readonly: false,
    labelClass: 'null',
    validator: TITLE
  },
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'description',
    label: 'Descripción',
    placeholder: 'Descripción',
    type: 'textarea',
    value: '',
    name: 'description',
    readonly: false,
    labelClass: 'null',
    validator: DESCRIPTION
  },
  {
    width: 'mt-3 shadow-sm space-y-px',
    id: 'status',
    label: 'Estado',
    placeholder: 'Estado',
    type: 'select',
    value: 'pending',
    name: 'status',
    labelClass: 'null',
    optionsSelect: [
      {
        default: true,
        valueToShow: 'Pendiente',
        tagValue: 'pending',
        disabled: false,
      },
      {
        default: false,
        valueToShow: 'En Progreso',
        tagValue: 'inProgress',
        disabled: false,
      },
      {
        default: false,
        valueToShow: 'Completadas',
        tagValue: 'completed',
        disabled: false,
      },
    ],
    readonly: false,
  },
];

export const CREATE_BUTTONS: IConfigActionButtons[] = [
  {
    width: 'mt-3 w-40',
    textToShow: 'Crear Tarea',
    action: 'action-continue__proccess',
    type: 'submit',
  },
  {
    width: 'mt-3 w-40',
    textToShow: 'Cancelar',
    action: 'action-cancel',
    type: 'button',
  },
];
