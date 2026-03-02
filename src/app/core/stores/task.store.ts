import { makeAutoObservable, runInAction } from 'mobx';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskApiService } from '../services/task-api.service';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  tasks: Task[] = [];
  loading = false;

  private api = inject(TaskApiService);

  constructor() {
    makeAutoObservable(this);
  }

  loadTasks() {
    this.loading = true;

    this.api.getTasks().subscribe({
      next: (data) => {
        runInAction(() => {
          this.tasks = data;

          this.loading = false;
        });
      },
      error: () => {
        runInAction(() => {
          this.loading = false;
        });
      },
    });
  }
}
