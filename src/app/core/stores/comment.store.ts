import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import { Comment } from '@core/models/comment.model';
@Injectable({ providedIn: 'root' })
export class CommentStore {
  comments: Comment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addComment(comment: Comment) {
    this.comments.push(comment);
  }

  getCommentsForTask(taskId: number): Comment[] {
    return this.comments.filter((c) => c.taskId === taskId && !c.parentId);
  }

  getReplies(parentId: string): Comment[] {
    return this.comments.filter((c) => c.parentId === parentId);
  }
}
