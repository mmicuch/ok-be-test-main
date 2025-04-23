import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { AuthService } from 'app/services/auth.service';

  
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf, NgClass],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" formControlName="username"
               [ngClass]="{'invalid': submitted && f['username'].errors}" />
        <div *ngIf="submitted && f['username'].errors">Username is required</div>
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" id="password" formControlName="password"
               [ngClass]="{'invalid': submitted && f['password'].errors}" />
        <div *ngIf="submitted && f['password'].errors">Password is required</div>
      </div>

      <div *ngIf="error" class="error">{{ error }}</div>

      <button type="submit">Login</button>
    </form>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Login failed';
      }
    });
  }
}
