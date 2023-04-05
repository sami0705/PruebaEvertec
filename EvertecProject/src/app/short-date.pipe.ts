import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {
  transform(value: string | Date, args?: any): string {
    return formatDate(value, 'yyyy-mm-dd', 'es-CO');
  }
}