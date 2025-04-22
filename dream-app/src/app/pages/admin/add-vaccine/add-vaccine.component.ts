import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-vaccine',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  template: `
    <div class="add-vaccine-container">
      <h1>Pridať novú vakcínu</h1>

      <div class="form-container">
        <form [formGroup]="vaccineForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="nazov">Názov vakcíny</label>
            <input
              type="text"
              id="nazov"
              formControlName="nazov"
              [ngClass]="{'invalid': submitted && f.nazov.errors}"
            >
            <div *ngIf="submitted && f.nazov.errors" class="error-message">
              Názov vakcíny je povinný
            </div>
          </div>

          <div class="form-group">
            <label for="vyrobca">Výrobca</label>
            <input
              type="text"
              id="vyrobca"
              formControlName="vyrobca"
              [ngClass]="{'invalid': submitted && f.vyrobca.errors}"
            >
            <div *ngIf="submitted && f.vyrobca.errors" class="error-message">
              Výrobca je povinný
            </div>
          </div>

          <div class="form-group">
            <label for="typ">Typ vakcíny</label>
            <select
              id="typ"
              formControlName="typ"
              [ngClass]="{'invalid': submitted && f.typ.errors}"
            >
              <option value="" disabled selected>Vyberte typ vakcíny</option>
              <option *ngFor="let type of vaccineTypes" [value]="type">{{ type }}</option>
            </select>
            <div *ngIf="submitted && f.typ.errors" class="error-message">
              Typ vakcíny je povinný
            </div>
          </div>

          <button type="submit" [disabled]="loading">
            <span *ngIf="loading">Pridávanie...</span>
            <span *ngIf="!loading">Pridať vakcínu</span>
          </button>

          <div *ngIf="error" class="error-message alert">
            {{ error }}
          </div>

          <div *ngIf="success" class="success-message alert">
            Vakcína bola úspešne pridaná.
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .add-vaccine-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h1 {
      margin-bottom: 2rem;
      text-align: center;
      color: #333;
    }

    .form-container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      padding: 2rem;
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

    input, select {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border 0.3s;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #666;
    }

    input.invalid, select.invalid {
      border-color: #e74c3c;
    }

    button {
      width: 100%;
      padding: 0.8rem;
      margin-top: 1rem;
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

    .success-message {
      color: #2ecc71;
    }

    .alert {
      margin-top: 1rem;
      padding: 0.8rem;
      border-radius: 4px;
      text-align: center;
    }

    .error-message.alert {
      background-color: #fceaea;
    }

    .success-message.alert {
      background-color: #e8f8f0;
    }
  `]
})
export class AddVaccineComponent {
  vaccineForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = false;
  vaccineTypes: string[] = ['mRNA', 'vektorová', 'proteínová', 'iná'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.vaccineForm = this.formBuilder.group({
      nazov: ['', Validators.required],
      vyrobca: ['', Validators.required],
      typ: ['', Validators.required]
    });
  }

  // Getter for easy access to form fields
  get f() { return this.vaccineForm.controls; }

  resetForm(): void {
    this.vaccineForm.reset();
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = false;

    // Stop if form is invalid
    if (this.vaccineForm.invalid) {
      return;
    }

    this.loading = true;
    this.http.post('http://localhost:8081/api/vakciny', this.vaccineForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = true;
          this.resetForm();
        },
        error: error => {
          this.error = error?.error?.message || 'Chyba pri pridávaní vakcíny';
          this.loading = false;
        }
      });
  }
}
