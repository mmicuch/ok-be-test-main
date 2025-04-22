import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Prihlásenie</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Používateľské meno</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              placeholder="Vaše používateľské meno"
              [ngClass]="{'invalid': submitted && f.username.errors}"
            >
            <div *ngIf="submitted && f.username.errors" class="error-message">
              Používateľské meno je povinné
            </div>
          </div>

          <div class="form-group">
            <label for="password">Heslo</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="Vaše heslo"
              [ngClass]="{'invalid': submitted && f.password.errors}"
            >
            <div *ngIf="submitted && f.password.errors" class="error-message">
              Heslo je povinné
            </div>
          </div>

          <button type="submit" [disabled]="loading">
            <span *ngIf="loading">Prihlasovanie...</span>
            <span *ngIf="!loading">Prihlásiť sa</span>
          </button>

          <div *ngIf="error" class="error-message alert">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem;
    }

    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background-color: white;
    }

    h2 {
      margin-bottom: 1.5rem;
      text-align: center;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    input {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #666;
    }

    input.invalid {
      border-color: #e74c3c;
    }

    button {
      width: 100%;
      padding: 0.8rem;
      border: none;
      border-radius: 4px;
      background-color: #333;
      color: white;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #444;
    }

    button:disabled {
      background-color: #999;
      cursor: not-allowed;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.9rem;
      margin-top: 0.5rem;
    }

    .alert {
      margin-top: 1rem;
      padding: 0.8rem;
      background-color: #fceaea;
      border-radius: 4px;
      text-align: center;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: error => {
          this.error = error?.error?.message || 'Nesprávne používateľské meno alebo heslo';
          this.loading = false;
        }
      });
  }
}
