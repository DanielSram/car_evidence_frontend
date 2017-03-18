import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../shared/date-utils.service';

/**
 * A simple Pipe for formatting millisecond into human-readable time format
 */
@Pipe({name: 'beautifyMillis'})
export class MillisecondBeautifierPipe implements PipeTransform {

    /**
     * Parses millisecond into human-readable time format
     * @param millis
     * @returns {any}
     */
    transform(millis: number): string {
        return millis ? DateUtils.beautifyMillis(millis) : null;
    }

}
