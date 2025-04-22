import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <a routerLink="/">Evidencia očkovaných pacientov</a>
        </div>
        <nav class="menu">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Domov</a></li>
            <li><a routerLink="/search" routerLinkActive="active">Vyhľadávanie</a></li>
            <li><a routerLink="/vaccinations" routerLinkActive="active">Zoznam očkovaných</a></li>

            <ng-container *ngIf="!isLoggedIn">
              <li><a routerLink="/login" routerLinkActive="active">Prihlásiť sa</a></li>
            </ng-container>

            <ng-container *ngIf="isLoggedIn && isAdmin">
              <li class="dropdown">
                <a (click)="toggleDropdown()" class="dropdown-toggle" [ngClass]="{'active': dropdownOpen}">Admin <span class="arrow">▼</span></a>
                <ul class="dropdown-menu" [ngClass]="{'show': dropdownOpen}">
                  <li><a routerLink="/admin/add-person" routerLinkActive="active">Pridať osobu</a></li>
                  <li><a routerLink="/admin/add-vaccine" routerLinkActive="active">Pridať vakcínu</a></li>
                  <li><a routerLink="/admin/add-vaccination" routerLinkActive="active">Pridať očkovanie</a></li>
                </ul>
              </li>
            </ng-container>

            <ng-container *ngIf="isLoggedIn">
              <li><a (click)="logout()" class="logout">Odhlásiť sa</a></li>
            </ng-container>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: #333;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .logo a {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .menu ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .menu li {
      margin-left: 1.5rem;
      position: relative;
    }

    .menu a {
      color: #ddd;
      text-decoration: none;
      padding: 0.5rem;
      transition: color 0.3s;
      cursor: pointer;
    }

    .menu a:hover, .menu a.active {
      color: white;
    }

    .logout {
      color: #ff9999 !important;
    }

    .logout:hover {
      color: #ff6666 !important;
    }

    .dropdown-toggle {
      display: flex;
      align-items: center;
    }

    .arrow {
      font-size: 0.7rem;
      margin-left: 0.3rem;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #333;
      min-width: 180px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 1000;
      border-radius: 4px;
      padding: 0.5rem 0;
    }

    .dropdown-menu.show {
      display: block;
    }

    .dropdown-menu li {
      margin: 0;
    }

    .dropdown-menu a {
      display: block;
      padding: 0.7rem 1rem;
    }

    .dropdown-menu a:hover {
      background-color: #444;
    }
  `]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  dropdownOpen = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.role === 'ADMIN';
    });
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
