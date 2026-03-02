import { Directive, ElementRef, effect, input } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true,
})
export class StatusColorDirective {
  status = input.required<string>();

  constructor(private el: ElementRef) {
    effect(() => {
      const element = this.el.nativeElement;
      const currentStatus = this.status();

      element.classList.remove(
        'bg-yellow-100',
        'text-yellow-800',
        'border-yellow-400',
        'bg-blue-100',
        'text-blue-800',
        'border-blue-400',
        'bg-green-100',
        'text-green-800',
        'border-green-400',
      );

      switch (currentStatus) {
        case 'Pending':
          element.classList.add('bg-yellow-100', 'text-yellow-800', 'border', 'border-yellow-400');
          break;

        case 'In Progress':
          element.classList.add('bg-blue-100', 'text-blue-800', 'border', 'border-blue-400');
          break;

        case 'Completed':
          element.classList.add('bg-green-100', 'text-green-800', 'border', 'border-green-400');
          break;
      }
    });
  }
}
