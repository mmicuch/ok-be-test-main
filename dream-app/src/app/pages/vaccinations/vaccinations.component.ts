import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, NgFor } from '@angular/common';

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
  selector: 'app-vaccinations',
  standalone: true,
  imports: [NgFor, DatePipe],
  template: `
    <div class="vaccinations-container">
      <h1>Zoznam očkovaných osôb</h1>

      <div class="table-container">
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
  `,
  styles: [`
    .vaccinations-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    h1 {
      margin-bottom: 2rem;
      text-align: center;
      color: #333;
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
export class VaccinationsComponent implements OnInit {
  osobaVakciny: OsobaVakcina[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOsobaVakciny();
  }

  loadOsobaVakciny(): void {
    this.http.get<OsobaVakcina[]>('http://localhost:8081/api/osobavakciny')
      .subscribe({
        next: (data) => {
          this.osobaVakciny = data;
        },
        error: (error) => {
          console.error('Error loading vaccinations:', error);
        }
      });
  }
}
