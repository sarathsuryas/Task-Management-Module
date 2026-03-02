import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStore } from '@core/stores/task.store';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calender',
  imports: [FullCalendarModule],
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.css',
})
export class CalenderComponent {
  private store = inject(TaskStore);
  private router = inject(Router);

  events = computed(() =>
    this.store.tasks.map((task) => ({
      title: task.title,
      date: task.deadline,
      color: this.getStatusColor(task.status),
      extendedProps: {
        taskId: task.id,
      },
    })),
  );

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: (info) => {
      const id = info.event.extendedProps['taskId'];
      this.router.navigate(['/tasks', id]);
    },
  };

  constructor() {
    this.store.loadTasks();

    // update events reactively
    setTimeout(() => {
      this.calendarOptions.events = this.events();
    });
  }

  getStatusColor(status: string) {
    switch (status) {
      case 'Pending':
        return '#f59e0b'; // amber
      case 'In Progress':
        return '#3b82f6'; // blue
      case 'Completed':
        return '#10b981'; // green
      default:
        return '#6b7280';
    }
  }
}
