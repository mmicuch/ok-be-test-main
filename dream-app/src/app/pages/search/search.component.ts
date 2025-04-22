import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OsobaVakcina {
  id: number;
  osobaMeno: string;
  osobaPriezvisko: string;
  vakcinaNazov: string;
  vakcinaTyp: string;
  datumAplikacie: string;
  poradieDavky: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, DatePipe],
  template: `
    <div class="search-container">
      <h1>Vyhľadávanie očkovaných osôb</h1>

      <div class="search-form">
        <div class="search-input">
          <input
            type="text"
            [(ngModel)]="searchQuery"
            placeholder="Zadajte meno alebo priezvisko osoby"
            (keyup.enter)="searchVaccinations()"
          >
          <button class="search-button" (click)="searchVaccinations()">Vyhľadať</button>
        </div>
      </div>

      <div class="results" *ngIf="searchPerformed">
        <h2 *ngIf="osobaVakciny.length === 0">Žiadne výsledky pre "{{ lastSearchQuery }}"</h2>

        <div class="table-container" *ngIf="osobaVakciny.length > 0">
          <h2>Výsledky vyhľadávania pre "{{ lastSearchQuery }}"</h2>
          <table>
            <thead>
              <tr>
                <th>Osoba</th>
                <th>Vakcína</th>
                <th>Typ vakcíny</th>
                <th>Dátum aplikácie</th>
                <th>Poradie dávky</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of osobaVakciny">
                <td>{{ record.osobaMeno }} {{ record.osobaPriezvisko }}</td>
                <td>{{ record.vakcinaNazov }}</td>
                <td>{{ record.vakcinaTyp }}</td>
                <td>{{ record.datumAplikacie | date:'dd.MM.yyyy' }}</td>
                <td>{{ record.poradieDavky }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h1, h2 {
      text-align: center;
      color: #333;
    }

    h1 {
      margin-bottom: 2rem;
    }

    h2 {
      margin: 2rem 0;
    }

    .search-form {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }

    .search-input {
      display: flex;
      width: 100%;
      max-width: 600px;
    }

    input {
      flex: 1;
      padding: 0.8rem 1rem;
      border: 1px solid #ddd;
      border-radius: 4px 0 0 4px;
      font-size: 1rem;
    }

    input:focus {
      outline: none;
      border-color: #666;
    }

    .search-button {
      padding: 0.8rem 1.5rem;
      background-color: #333;
      color: white;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .search-button:hover {
      background-color: #444;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
    }

    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }

    th {
      background-color: #f8f8f8;
      font-weight: 600;
      color: #333;
    }

    tr:hover {
      background-color: #f9f9f9;
    }
  `]
})
export class SearchComponent {
  searchQuery = '';
  lastSearchQuery = '';
  osobaVakciny: OsobaVakcina[] = [];
  searchPerformed = false;

  constructor(private http: HttpClient) {}

  searchVaccinations(): void {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.lastSearchQuery = this.searchQuery;
    this.searchPerformed = true;

    this.http.get<OsobaVakcina[]>(`http://localhost:8081/api/osobavakciny/search/${this.searchQuery}`)
      .subscribe({
        next: (data) => {
          this.osobaVakciny = data;
        },
        error: (error) => {
          console.error('Error searching vaccinations:', error);
          this.osobaVakciny = [];
        }
      });
  }
}
