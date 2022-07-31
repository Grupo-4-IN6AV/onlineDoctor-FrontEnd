import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMedicamentName'
})
export class SearchMedicamentNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
