import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';

export const TASK_LIST_ROUTES: Routes = [
  {
    path: '',
    component: TaskListComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: TaskDetailsComponent,
  },
];
