import { FormGroup, ValidatorFn } from '@angular/forms';
import { IOptionsOfSelect } from './optionsOfSelect.interface';

export interface IOptionsInput {
  width: string;
  id: string;
  label: string;
  placeholder: string;
  type: string;
  value: string | number | Date;
  name: string;
  optionsSelect?: IOptionsOfSelect[];
  readonly: boolean;
  validator?: ValidatorFn[];
  listenOtherControls?: listenOtherControl;
  labelClass?: string,
}

export interface listenOtherControl{
  nameControlToListen: string,
  functionToExecute: (args: argsFunctionsToEWxecute) => void,
}
export interface argsFunctionsToEWxecute {
  controlValue: string,
  form: FormGroup,
}