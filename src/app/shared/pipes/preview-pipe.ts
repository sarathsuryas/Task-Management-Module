import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preview',
})
export class PreviewPipe implements PipeTransform {
  transform(value: string | null, limit: number = 120): string {
    if (!value) return '';

    // Remove HTML tags
    const text = value.replace(/<[^>]*>/g, '');

    if (text.length <= limit) return text;

    return text.substring(0, limit) + '...';
  }
}
