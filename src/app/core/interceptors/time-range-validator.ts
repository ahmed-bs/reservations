import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator function for time range validation.
 * @param min Minimum time in HH:mm format.
 * @param max Maximum time in HH:mm format.
 * @returns Validator function that returns ValidationErrors if the time is outside the range, otherwise null.
 */
export function timeRangeValidator(min: string, max: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // If there's no value, return null (no error)
    if (!value) {
      return null;
    }

    // Split the time value into hours and minutes
    const [hours, minutes] = value.split(':').map(Number);
    const currentTime = hours * 60 + minutes; // Convert time to minutes since midnight

    // Split and convert min and max time into hours and minutes
    const [minHours, minMinutes] = min.split(':').map(Number);
    const minTime = minHours * 60 + minMinutes; // Convert min time to minutes since midnight

    const [maxHours, maxMinutes] = max.split(':').map(Number);
    const maxTime = maxHours * 60 + maxMinutes; // Convert max time to minutes since midnight

    // Check if current time is outside the specified range
    if (currentTime < minTime || currentTime > maxTime) {
      return { timeRange: true }; // Return ValidationErrors if outside the range
    }

    return null; // Return null if within the range (no error)
  };
}
