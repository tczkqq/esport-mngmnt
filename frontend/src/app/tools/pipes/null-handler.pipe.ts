import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullHandler',
})
export class NullHandlerPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === null || value === undefined) return '- - -';
    return value;
  }
}
