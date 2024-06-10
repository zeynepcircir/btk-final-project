import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'perfomance',
})
export class PerfomancePipe implements PipeTransform {
  transform(performanceReview: string): string {
    switch (performanceReview) {
      case 'Below Average':
        return 'orange';
      case 'Excellent':
        return 'green';
      case 'Good':
        return 'blue';
      case 'Poor':
        return 'red';
      case 'Average':
        return 'grey';
      default:
        return 'white';
    }
  }
}
