import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then((m) => m.MainLayoutComponent),

    children: [
      {
        path: '',
        loadChildren: () => import('@features/home/home.routes').then((m) => m.HOME_ROUTES),
      },
      {
        path: 'tasks',
        loadChildren: () => import('@features/tasks/tasks.routes').then((m) => m.TASK_LIST_ROUTES),
      },
      {
        path: 'calender',
        loadChildren: () =>
          import('@features/calender/calender.routes').then((m) => m.CALENDER_ROUTES),
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
