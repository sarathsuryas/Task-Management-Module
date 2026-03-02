import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskStore } from '@core/stores/task.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TMM');

  store = inject(TaskStore);

  ngOnInit() {
    this.store.loadTasks();
  }
}
