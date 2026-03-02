import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '@core/models/task.model';
import { StatusColorDirective } from '@shared/directives/status-color.directive';

@Component({
  selector: 'app-task-card',
  imports: [StatusColorDirective, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  task = input.required<Task>();
  private router = inject(Router);
  goToDetails() {
    this.router.navigate(['/tasks', this.task().id]);
  }
  onEdit(event: MouseEvent) {
    event.stopPropagation();
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation();
  }
}
