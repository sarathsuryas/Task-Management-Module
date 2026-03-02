import { Component, inject, input } from '@angular/core';
import { Comment } from '@core/models/comment.model';
import { CommentStore } from '@core/stores/comment.store';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-thread',
  imports: [CommentFormComponent, DatePipe],
  templateUrl: './comment-thread.component.html',
  styleUrl: './comment-thread.component.css',
})
export class CommentThreadComponent {
  comments = input<Comment[]>([]);

  private store = inject(CommentStore);
  replyTo?: string;

  replies(parentId: string) {
    return this.store.getReplies(parentId);
  }

  toggleReply(id: string) {
    this.replyTo = this.replyTo === id ? undefined : id;
  }

  addReply(parentId: string, text: string) {
    this.store.addComment({
      id: crypto.randomUUID(),
      taskId: this.comments()[0].taskId,
      parentId,
      text,
      createdAt: new Date().toISOString(),
    });
    this.replyTo = undefined;
  }
}
