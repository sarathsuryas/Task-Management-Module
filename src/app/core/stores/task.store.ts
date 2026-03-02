import { makeAutoObservable, runInAction } from 'mobx';
import { inject, Injectable } from '@angular/core';
import { CreateTaskPayload, Task, UpdateTaskPayload } from '../models/task.model';
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

  getTaskById(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  updateTask(id: number, payload: UpdateTaskPayload): Task | undefined {
    const index = this.tasks.findIndex((task) => task.id === id);

    if (index < 0) {
      return undefined;
    }

    const updatedTask: Task = {
      ...this.tasks[index],
      ...payload,
      id,
    };

    this.tasks = [...this.tasks.slice(0, index), updatedTask, ...this.tasks.slice(index + 1)];

    this.hasLoaded = true;
    return updatedTask;
  }
  deleteTask(id: number) {
    runInAction(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }
}
