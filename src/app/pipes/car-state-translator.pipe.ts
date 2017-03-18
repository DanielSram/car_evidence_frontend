import { Pipe, PipeTransform } from '@angular/core';
import carStates from '../shared/CarStates';

/**
 * A simple Pipe for translating Car states.
 */
@Pipe({name: 'translateState'})
export class CarStateTranslatorPipe implements PipeTransform {

    /**
     * Transforms code value into view value
     * @param value
     * @returns {any}
     */
    transform(value: string): string {
        let carState = carStates.find(state => state.value === value);

        if (carState) return carState.viewValue;

        console.log('CarStateTranslatorPipe: Undefined car state: ', value);
        return value;
    }

}
