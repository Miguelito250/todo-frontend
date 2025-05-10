import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  type FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p class="mt-2 text-center text-sm text-gray-400">
            Or
            <a
              routerLink="/login"
              class="font-medium text-indigo-400 hover:text-indigo-300"
            >
              sign in to your existing account
            </a>
          </p>
        </div>
        <form
          class="mt-8 space-y-6"
          [formGroup]="registerForm"
          (ngSubmit)="onSubmit()"
        >
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="name" class="sr-only">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                formControlName="name"
                autocomplete="name"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
              />
              @if (registerForm.get('name')?.invalid &&
              registerForm.get('name')?.touched) {
              <p class="mt-1 text-sm text-red-500">Full name is required</p>
              }
            </div>
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                formControlName="email"
                autocomplete="email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              @if (registerForm.get('email')?.invalid &&
              registerForm.get('email')?.touched) {
              <p class="mt-1 text-sm text-red-500">
                Please enter a valid email address
              </p>
              }
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                formControlName="password"
                autocomplete="new-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              @if (registerForm.get('password')?.invalid &&
              registerForm.get('password')?.touched) {
              <p class="mt-1 text-sm text-red-500">
                Password must be at least 6 characters
              </p>
              }
            </div>
            <div>
              <label for="confirmPassword" class="sr-only"
                >Confirm Password</label
              >
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                formControlName="confirmPassword"
                autocomplete="new-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
              />
              @if (registerForm.errors?.['passwordMismatch'] &&
              registerForm.get('confirmPassword')?.touched) {
              <p class="mt-1 text-sm text-red-500">Passwords do not match</p>
              }
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="registerForm.invalid"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this._fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // In a real app, you would call your auth service here
      console.log('Register form submitted', this.registerForm.value);

      // Navigate to login after successful registration
      this._router.navigate(['/login']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
