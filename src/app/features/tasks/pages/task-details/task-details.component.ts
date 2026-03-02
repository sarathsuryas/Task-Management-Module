import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '@core/models/task.model';
import { CommentStore } from '@core/stores/comment.store';
import { TaskStore } from '@core/stores/task.store';
import { TaskBodyComponent } from '@features/tasks/components/task-body/task-body.component';
import { CommentFormComponent } from '@features/comments/components/comment-form/comment-form.component';
import { CommentThreadComponent } from '@features/comments/components/comment-thread/comment-thread.component';

@Component({
  selector: 'app-task-details',
  imports: [TaskBodyComponent, CommentFormComponent, CommentThreadComponent],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css',
})
export class TaskDetailsComponent {
  private route = inject(ActivatedRoute);
  private store = inject(TaskStore);
  commentStore = inject(CommentStore);
  taskId = signal<number | null>(null);
  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.taskId.set(Number(id));
      }
    });
  }

  addComment(text: string) {
    this.commentStore.addComment({
      id: crypto.randomUUID(),
      taskId: this.task().id,
      text,
      createdAt: new Date().toISOString(),
    });
  }

  task = computed<Task>(() => this.store.tasks.find((t) => t.id === this.taskId()) as Task);
}
