import { Component, inject } from "@angular/core"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private _fb = inject(FormBuilder);
  private _router = inject(Router)
  
  loginForm: FormGroup

  constructor(
  ) {
    this.loginForm = this._fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this._router.navigate(["/dashboard"])
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
