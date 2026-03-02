import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskStatus } from '@core/models/task.model';
import { TaskStore } from '@core/stores/task.store';
import { QUILL_EDITOR_CONFIG } from '@shared/config/quill.config';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, QuillModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  private fb = inject(FormBuilder);
  private store = inject(TaskStore);
  private router = inject(Router);
  quillConfig = QUILL_EDITOR_CONFIG;
  statuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    deadline: ['', Validators.required],
    status: ['Pending' as TaskStatus, Validators.required],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.addTask(this.form.getRawValue());
    this.router.navigate(['/tasks']);
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
