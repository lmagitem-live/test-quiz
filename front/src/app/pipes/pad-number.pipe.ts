import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padNumber',
  standalone: true,
})
export class PadNumberPipe implements PipeTransform {
  transform(value: number, totalLength: number = 4): string {
    if (value === undefined || value === null) {
      return '0'.repeat(totalLength);
    }
    return value.toString().padStart(totalLength, '0');
  }
}
