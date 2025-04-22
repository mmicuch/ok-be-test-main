import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VaccinationsComponent } from './pages/vaccinations/vaccinations.component';
import { SearchComponent } from './pages/search/search.component';
import { AddPersonComponent } from './pages/admin/add-person/add-person.component';
import { AddVaccineComponent } from './pages/admin/add-vaccine/add-vaccine.component';
import { AddVaccinationComponent } from './pages/admin/add-vaccination/add-vaccination.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vaccinations', component: VaccinationsComponent },
  { path: 'search', component: SearchComponent },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      { path: 'add-person', component: AddPersonComponent },
      { path: 'add-vaccine', component: AddVaccineComponent },
      { path: 'add-vaccination', component: AddVaccinationComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
