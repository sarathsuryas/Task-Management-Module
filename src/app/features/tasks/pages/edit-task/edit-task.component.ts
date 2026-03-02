import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskStatus } from '@core/models/task.model';
import { TaskStore } from '@core/stores/task.store';
import { QUILL_EDITOR_CONFIG } from '@shared/config/quill.config';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-edit-task',
  imports: [ReactiveFormsModule, QuillModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  store = inject(TaskStore);

  quillConfig = QUILL_EDITOR_CONFIG;
  statuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];

  taskId = Number(this.route.snapshot.paramMap.get('id'));

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    deadline: ['', Validators.required],
    status: ['Pending' as TaskStatus, Validators.required],
  });

  ngOnInit() {
    this.store.loadTasks();
    this.patchTaskToForm();
  }

  get currentTaskExists(): boolean {
    return !!this.store.getTaskById(this.taskId);
  }

  private patchTaskToForm() {
    const task = this.store.getTaskById(this.taskId);

    if (!task) {
      return;
    }

    this.form.patchValue({
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const updated = this.store.updateTask(this.taskId, this.form.getRawValue());

    if (!updated) {
      return;
    }

    this.router.navigate(['/tasks']);
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
