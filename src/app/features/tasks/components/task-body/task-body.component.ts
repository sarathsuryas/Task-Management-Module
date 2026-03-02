import { Component, input } from '@angular/core';
import { Task } from '@core/models/task.model';
import { StatusColorDirective } from '@shared/directives/status-color.directive';

@Component({
  selector: 'app-task-body',
  imports: [StatusColorDirective],
  templateUrl: './task-body.component.html',
  styleUrl: './task-body.component.css',
})
export class TaskBodyComponent {
  task = input.required<Task>();
}
