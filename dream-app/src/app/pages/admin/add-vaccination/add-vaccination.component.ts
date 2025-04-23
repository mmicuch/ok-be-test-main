import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { NgClass } from '@angular/common';

interface Osoba {
  id: number;
  meno: string;
  priezvisko: string;
}

interface Vakcina {
  id: number;
  nazov: string;
  typ: string;
}

@Component({
  selector: 'app-add-vaccination',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, NgClass],
  template: `
    <div class="add-vaccination-container">
      <h1>Pridať nové očkovanie</h1>

      <div class="form-container">
        <form [formGroup]="vaccinationForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="osobaId">Osoba</label>
            <select
              id="osobaId"
              formControlName="osobaId"
              [ngClass]="{'invalid': submitted && f['osobaId'].errors}"
            >
              <option value="" disabled selected>Vyberte osobu</option>
              <option *ngFor="let osoba of osoby" [value]="osoba.id">
                {{ osoba.meno }} {{ osoba.priezvisko }}
              </option>
            </select>
            <div *ngIf="submitted && f['osobaId'].errors" class="error-message">
              Osoba je povinná
            </div>
          </div>

          <div class="form-group">
            <label for="vakcinaId">Vakcína</label>
            <select
              id="vakcinaId"
              formControlName="vakcinaId"
              [ngClass]="{'invalid': submitted && f['vakcinaId'].errors}"
            >
              <option value="" disabled selected>Vyberte vakcínu</option>
              <option *ngFor="let vakcina of vakciny" [value]="vakcina.id">
                {{ vakcina.nazov }} ({{ vakcina.typ }})
              </option>
            </select>
            <div *ngIf="submitted && f['vakcinaId'].errors" class="error-message">
              Vakcína je povinná
            </div>
          </div>

          <div class="form-group">
            <label for="datumAplikacie">Dátum aplikácie</label>
            <input
              type="date"
              id="datumAplikacie"
              formControlName="datumAplikacie"
              [ngClass]="{'invalid': submitted && f['datumAplikacie'].errors}"
            >
            <div *ngIf="submitted && f['datumAplikacie'].errors" class="error-message">
              Dátum aplikácie je povinný
            </div>
          </div>

          <div class="form-group">
            <label for="poradieDavky">Poradie dávky</label>
            <input
              type="number"
              id="poradieDavky"
              formControlName="poradieDavky"
              min="1"
              [ngClass]="{'invalid': submitted && f['poradieDavky'].errors}"
            >
            <div *ngIf="submitted && f['poradieDavky'].errors" class="error-message">
              Poradie dávky je povinné (minimálne 1)
            </div>
          </div>

          <button type="submit" [disabled]="loading">
            <span *ngIf="loading">Pridávanie...</span>
            <span *ngIf="!loading">Pridať očkovanie</span>
          </button>

          <div *ngIf="error" class="error-message alert">
            {{ error }}
          </div>

          <div *ngIf="success" class="success-message alert">
            Očkovanie bolo úspešne pridané.
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .add-vaccination-container {
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
export class AddVaccinationComponent implements OnInit {
  vaccinationForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success = false;
  osoby: Osoba[] = [];
  vakciny: Vakcina[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.vaccinationForm = this.formBuilder.group({
      osobaId: ['', Validators.required],
      vakcinaId: ['', Validators.required],
      datumAplikacie: ['', Validators.required],
      poradieDavky: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadOsoby();
    this.loadVakciny();
  }

  // Getter for easy access to form fields
  get f() { return this.vaccinationForm.controls; }

  loadOsoby(): void {
    this.http.get<Osoba[]>('http://localhost:8081/api/osoby/all')
      .subscribe({
        next: (data) => {
          this.osoby = data;
        },
        error: (error) => {
          console.error('Error loading people:', error);
        }
      });
  }

  loadVakciny(): void {
    this.http.get<Vakcina[]>('http://localhost:8081/api/vakciny')
      .subscribe({
        next: (data) => {
          this.vakciny = data;
        },
        error: (error) => {
          console.error('Error loading vaccines:', error);
        }
      });
  }

  resetForm(): void {
    this.vaccinationForm.reset();
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';
    this.success = false;

    // Stop if form is invalid
    if (this.vaccinationForm.invalid) {
      return;
    }

    const formValue = this.vaccinationForm.value;

    // Format payload for API
    const payload = {
      osoba: { id: formValue.osobaId },
      vakcina: { id: formValue.vakcinaId },
      datumAplikacie: formValue.datumAplikacie,
      poradieDavky: formValue.poradieDavky
    };

    this.loading = true;
    this.http.post('http://localhost:8081/api/osobavakciny', payload)
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = true;
          this.resetForm();
        },
        error: error => {
          this.error = error?.error?.message || 'Chyba pri pridávaní očkovania';
          this.loading = false;
        }
      });
  }
}
