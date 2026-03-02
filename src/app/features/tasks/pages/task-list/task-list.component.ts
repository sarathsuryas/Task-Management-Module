import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskStore } from '@core/stores/task.store';
import { TaskCardComponent } from '@features/tasks/components/task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  imports: [TaskCardComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  store = inject(TaskStore);

  ngOnInit() {
    this.store.loadTasks();
  }
}
