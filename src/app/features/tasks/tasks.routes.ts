import { Routes } from '@angular/router';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const TASK_LIST_ROUTES: Routes = [
  {
    path: '',
    component: TaskListComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddTaskComponent,
  },
  {
    path: 'edit/:id',
    component: EditTaskComponent,
  },
  {
    path: ':id',
    component: TaskDetailsComponent,
  },
];
