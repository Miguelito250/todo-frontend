import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { type FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import type { Task } from '@models/task.model';
import { FormComponent } from '../../../shared/components/form/form.component';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import {
  CREATE_BUTTONS,
  CREATE_INPUTS,
} from '@shared/constants/forms/tasks/createInputs';
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';
import { TasksService } from '../services/tasks/tasks.service';
import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: './task-form-component.html',
})
export class TaskFormComponent implements OnInit {
  private readonly _authService = inject(AuthService)
  private readonly _taskService = inject(TasksService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  // Para entender el los inputs dinamicos porfavor lea sobre la documentacion del app-form
  public createInputs: IOptionsInput[];
  public buttonActions: IConfigActionButtons[];

  private _taskId: string | null = null;
  public tasks: Task[] = [];
  public isEditMode = false;

  constructor() {
    this.createInputs = CREATE_INPUTS;
    this.buttonActions = CREATE_BUTTONS;
  }

  /**
   * Si existe el id en el parametro es que lo que se va a realizar a la tarea es editarla
   * entonces se solicita toda la informaciòn de la tarea para poder mostrarla en pantalla
   */
  ngOnInit(): void {
    this._taskId = this._route.snapshot.paramMap.get('id');
    if (this._taskId) {
      this.isEditMode = true;

      this._taskService.getTaskById(this._taskId).subscribe({
        next: (task) => {
          if (task) {
            this.drawInputs(task);
          } else {
            console.warn('Task not found');
          }
        },
        error: (err) => console.error('Error founding taskk:', err),
      });
    } else {
      this.createInputs = CREATE_INPUTS;
    }
  }

  public onSubmit($form: FormGroup): void {
    if ($form.valid) {
      const formValue = $form.value as Task;

      if (this.isEditMode && this._taskId) {
        this._taskService.updateTask(this._taskId, formValue).subscribe({
          next(value) {
            console.log('Task updated succesfully', value);
          },
        });
      } else {
        // Se crea  nuevo objeto para poder crearlo debido a que con el id no permite crear el objeto en la API
        const newTask: Omit<Task, 'id' | 'createdAt'> = {
          title: formValue.title,
          description: formValue.description,
          status: formValue.status,
          userId: this._authService.userId ?? ""
        };
        this._taskService.createTask(newTask);
      }

      this._router.navigate(['/dashboard']);
    }
  }

  public cancel(): void {
    this._router.navigate(['/tasks']);
  }

/**
 * Esta funcion hace parte del componente app-fom y lo que hace es cuando se va a editar poder insertar en 
 * al momento de editar la tarea
 */
  public drawInputs(task: Task) {
    this.createInputs = CREATE_INPUTS.map((input) => ({
      ...input,
      value: task[input.name as keyof typeof task] ?? input.value,
    }));

    this.buttonActions = CREATE_BUTTONS.map((button) => {
      if (button.type === 'submit' && this._taskId) {
        return {
          ...button,
          textToShow: 'Actualizar Tarea',
        };
      }
      return button;
    });
  }
}
