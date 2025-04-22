import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Evidencia očkovaných pacientov</h1>
      <div class="content">
        <p>
          Vitajte v informačnom systéme pre evidenciu očkovaných pacientov. Tento systém slúži na správu
          informácií o vakcínach a očkovaných osobách.
        </p>
        <div class="features">
          <div class="feature">
            <h3>Evidencia osôb</h3>
            <p>Ukladanie informácií o osobách, vrátane ich mena, priezviska, roku narodenia a pohlavia.</p>
          </div>
          <div class="feature">
            <h3>Evidencia vakcín</h3>
            <p>Správa rôznych typov vakcín používaných v očkovacom procese.</p>
          </div>
          <div class="feature">
            <h3>Záznamy o očkovaní</h3>
            <p>Evidencia očkovaní - ktorá osoba kedy dostala ktorú vakcínu a ktorú dávku.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem;
      text-align: center;
    }

    h1 {
      margin-bottom: 2rem;
      color: #333;
    }

    .content {
      max-width: 800px;
      margin: 0 auto;
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .features {
      display: flex;
      justify-content: space-between;
      gap: 1.5rem;
      margin-top: 3rem;
    }

    .feature {
      flex: 1;
      padding: 1.5rem;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s;
    }

    .feature:hover {
      transform: translateY(-5px);
    }

    .feature h3 {
      margin-bottom: 1rem;
      color: #333;
    }
  `]
})
export class HomeComponent {}
