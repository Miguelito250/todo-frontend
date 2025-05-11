import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  output,
  OutputEmitterRef,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import { FormService } from '@shared/services/form/form.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnChanges {
  @Input() public classParent: string;
  @Input() public inputs: IOptionsInput[];
  @Input() public configActionsButtons: IConfigActionButtons[];

  @Output() cancelAction = new EventEmitter<void>();

  public formValues: OutputEmitterRef<FormGroup> = output<FormGroup>();

  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _formService: FormService = inject(FormService);

  public form: FormGroup;

  constructor() {
    this.configActionsButtons = [];
    this.classParent = '';
    this.inputs = [];
    this.form = this._formBuilder.group({});
  }

  ngOnInit(): void {
    this.form = this.buildForm(this.inputs);
    this.callFunctionsToObject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputs'] && !changes['inputs'].firstChange) {
      this.form = this.buildForm(this.inputs);
      this.callFunctionsToObject();
    }
  }

  private buildForm(inputs: IOptionsInput[]): FormGroup {
    const group: Record<string, FormControl> = {};

    inputs.forEach((input) => {
      group[input.name] = new FormControl(
        input.value ?? '',
        input.validator ?? [],
      );
    });

    return this._formBuilder.group(group);
  }

  public getErrorMessages(controlName: string) {
    const control = this.form.get(controlName);
    return this._formService.getErrorMessages(control);
  }

  public emitSubmit(): void {
    this.formValues.emit(this.form);
  }

  private callFunctionsToObject() {
    this.inputs.forEach((input) => {
      if (input.listenOtherControls) {
        const controlToListen = this.form.get(
          input.listenOtherControls.nameControlToListen,
        );
        controlToListen?.valueChanges.subscribe((controlValue) => {
          input.listenOtherControls!.functionToExecute({
            controlValue,
            form: this.form,
          });
        });
      }
    });
  }
}
