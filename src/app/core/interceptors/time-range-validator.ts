import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeRangeValidator(min: string, max: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // No value, so no error.
    }

    const [hours, minutes] = value.split(':').map(Number);
    const currentTime = hours * 60 + minutes;
    
    const [minHours, minMinutes] = min.split(':').map(Number);
    const minTime = minHours * 60 + minMinutes;
    
    const [maxHours, maxMinutes] = max.split(':').map(Number);
    const maxTime = maxHours * 60 + maxMinutes;
    
    if (currentTime < minTime || currentTime > maxTime) {
      return { timeRange: true };
    }
    
    return null;
  };
}
