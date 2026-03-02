import { makeAutoObservable, runInAction } from 'mobx';
import { inject, Injectable } from '@angular/core';
import { CreateTaskPayload, Task } from '../models/task.model';
import { TaskApiService } from '../services/task-api.service';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  tasks: Task[] = [];
  loading = false;
  private hasLoaded = false;

  private api = inject(TaskApiService);

  constructor() {
    makeAutoObservable(this);
  }

  loadTasks() {
    if (this.loading || this.hasLoaded) {
      return;
    }

    this.loading = true;

    this.api.getTasks().subscribe({
      next: (data) => {
        runInAction(() => {
          this.tasks = data;
          this.loading = false;
          this.hasLoaded = true;
        });
      },
      error: () => {
        runInAction(() => {
          this.loading = false;
        });
      },
    });
  }

  addTask(payload: CreateTaskPayload): Task {
    const nextId = this.tasks.length > 0 ? Math.max(...this.tasks.map((task) => task.id)) + 1 : 1;

    const task: Task = {
      id: nextId,
      ...payload,
    };

    this.tasks = [task, ...this.tasks];
    this.hasLoaded = true;

    return task;
  }
}
