import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  imports: [FormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css',
})
export class CommentFormComponent {
  parentId = input<string | undefined>();
  submitComment = output<string>();
  text = '';

  submit() {
    const value = this.text.trim();
    if (!value) {
      return;
    }

    this.submitComment.emit(value);
    this.text = '';
  }
}
