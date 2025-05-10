import { Component, inject, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import type { Task } from '@models/task.model';
import { FormComponent } from '../../../shared/components/form/form.component';
import { IOptionsInput } from '@shared/interfaces/optionsInput.interface';
import {
  CREATE_BUTTONS,
  CREATE_INPUTS,
} from '@shared/constants/forms/tasks/createInputs';
import { IConfigActionButtons } from '@shared/interfaces/configActionButtons.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormComponent],
  templateUrl: './task-form-component.html',
})
export class TaskFormComponent implements OnInit {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  public createInputs: IOptionsInput[];
  public buttonActions: IConfigActionButtons[];
  isEditMode = false;
  taskId: number | null = null;

  // Mock tasks data (in a real app, this would come from a service)
  tasks: Task[] = [
    {
      id: 1,
      title: 'Complete project proposal',
      description: 'Write and submit the project proposal document',
      status: 'completed',
      createdAt: new Date(2023, 4, 15),
    },
    {
      id: 2,
      title: 'Design user interface',
      description: 'Create wireframes and mockups for the new application',
      status: 'in-progress',
      createdAt: new Date(2023, 4, 18),
    },
  ];

  constructor() {
    this.createInputs = CREATE_INPUTS;
    this.buttonActions = CREATE_BUTTONS;
  }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;

      // In a real app, you would fetch the task from your service
      const task = this.tasks.find((t) => t.id === this.taskId);
      if (task) {
        this.createInputs = CREATE_INPUTS.map((input) => ({
          ...input,
          value: task[input.name as keyof typeof task] ?? input.value,
        }));

        this.buttonActions = CREATE_BUTTONS.map((button) => {
          if (button.type === 'submit' && this.taskId) {
            return {
              ...button,
              textToShow: 'Actualizar Tarea',
            };
          }
          return button;
        });
      }
    }
  }

  onSubmit($form: FormGroup): void {
    if ($form.valid) {
      const formValue = $form.value;

      if (this.isEditMode && this.taskId) {
        // In a real app, you would call your service to update the task
        console.log('Updating task', this.taskId, formValue);
      } else {
        // In a real app, you would call your service to create a new task
        console.log('Creating new task', formValue);
      }

      this._router.navigate(['/tasks']);
    }
  }

  cancel(): void {
    this._router.navigate(['/tasks']);
  }
}
