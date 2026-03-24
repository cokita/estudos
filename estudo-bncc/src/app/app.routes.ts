import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'materia/:id',
    loadComponent: () =>
      import('./features/materia/materia.component').then(m => m.MateriaComponent),
  },
  {
    path: 'materia/:id/assunto/:topico',
    loadComponent: () =>
      import('./features/assunto/assunto.component').then(m => m.AssuntoComponent),
  },
  {
    path: 'materia/:id/assunto/:topico/quiz',
    loadComponent: () =>
      import('./features/questoes/questoes.component').then(m => m.QuestoesComponent),
  },
  { path: '**', redirectTo: '' },
];
