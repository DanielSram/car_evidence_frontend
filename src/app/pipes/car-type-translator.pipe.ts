import { Pipe, PipeTransform } from '@angular/core';
import carTypes from '../shared/CarTypes';

/**
 * A simple Pipe for translating Car types.
 */
@Pipe({name: 'translateType'})
export class CarTypeTranslatorPipe implements PipeTransform {

    /**
     * Transform code value into view value
     * @param value
     * @returns {any}
     */
    transform(value: string): string {
        let carType = carTypes.find(type => type.value === value);

        if (carType) return carType.viewValue;

        console.log('CarTypeTranslatorPipe: Undefined car type: ', value);
        return value;
    }

}
