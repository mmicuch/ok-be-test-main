import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  template: `
    <div class="add-person-container">
      <h1>Pridať novú osobu</h1>

      <div class="form-container">
        <form [formGroup]="personForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="meno">Meno</label>
            <input
              type="text"
              id="meno"
              formControlName="meno"
              [ngClass]="{'invalid': submitted && f.meno.errors}"
            >
            <div *ngIf="submitted && f.meno.errors" class="error-message">
              Meno je povinné
            </div>
          </div>

          <div class="form-group">
            <label for="priezvisko">Priezvisko</label>
            <input
              type="text"
              id="priezvisko"
              formControlName="priezvisko"
              [ngClass]="{'invalid': submitted && f.priezvisko.errors}"
            >
            <div *ngIf="submitted && f.priezvisko.errors" class="error-message">
              Priezvisko je povinné
            </div>
          </div>

          <div class="form-group">
            <label for="rokNarodenia">Rok narodenia</label>
            <select
              id="rokNarodenia"
              formControlName="rokNarodenia"
              [ngClass]="{'invalid': submitted && f.rokNarodenia.errors}"
            >
              <option value="" disabled selected>Vyberte rok narodenia</option>
              <option *ngFor="let year of years" [value]="year">{{ year }}</option>
            </select>
            <div *ngIf="submitted && f.rokNarodenia.errors" class="error-message">
              Rok narodenia je povinný
            </div>
          </div>

          <div class="form-group">
            <label for="pohlavie">Pohlavie</label>
            <select
              id="pohlavie"
              formControlName="pohlavie"
              [ngClass]="{'invalid': submitted && f.pohlavie.errors}"
            >
              <option value="" disabled selected>Vyberte pohlavie</option>
              <option value="MUZ">Muž</option>
              <option value="ZENA">Žena</option>
            </select>
            <div *ngIf="submitted && f.pohlavie.errors" class="error-message">
              Pohlavie je povinné
            </div>
          </div>

          <button type="submit" [disabled]="loading">
            <span *ngIf="loading">Pridávanie...</span>
            <span *ngIf="!loading">Pridať osobu</span>
          </button>

          <div *ngIf="error" class="error-message alert">
            {{ error }}
          </div>

          <div *ngIf="success" class="success-message alert">
            Osoba bola úspešne pridaná.
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .add-person-container {
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
export class AddPersonComponent implements OnInit {
  personForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = false;
  years: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.personForm = this.formBuilder.group({
      meno: ['', Validators.required],
      priezvisko: ['', Validators.required],
      rokNarodenia: ['', Validators.required],
      pohlavie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.generateYears();
  }

  // Getter for easy access to form fields
  get f() { return this.personForm.controls; }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
      this.years.push(y);
    }
  }

  resetForm(): void {
    this.personForm.reset();
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = false;

    // Stop if form is invalid
    if (this.personForm.invalid) {
      return;
    }

    this.loading = true;
    this.http.post('http://localhost:8081/api/osoby/add', this.personForm.value)
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = true;
          this.resetForm();
        },
        error: error => {
          this.error = error?.error?.message || 'Chyba pri pridávaní osoby';
          this.loading = false;
        }
      });
  }
}
