import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify'
})
export class SlugifyPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')          // Replace spaces with -
      .replace(/-+/g, '-');           // Replace multiple - with single -
  }

}
