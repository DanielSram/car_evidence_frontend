/**
 * Date utilities class
 */
export class DateUtils {

    private static TODAY = new Date().getTime();

    private static ONE_DAY = 1000 * 60 * 60 * 24;

    /**
     * Parses string into milliseconds
     * @param str
     * @returns {number}
     */
    static stringToMilliseconds(str: string): number {
        return (new Date(str).getTime());
    }

    /**
     * Parses anything into milliseconds
     * @param any
     * @returns {number}
     */
    static anyToMilliseconds(any: any): number {
        return (new Date(any).getTime());
    }

    /**
     * Parses millisecond into human-readable time format
     * @param millis
     * @returns {string}
     */
    static beautifyMillis(millis: number): string {
        let d = new Date(millis);
        return d.getDate() + '. ' + (d.getMonth() + 1) + '. ' + d.getFullYear();
    }

    /**
     * Calculates date difference from today
     * @param _date
     * @returns {string}
     */
    static calculateAge(_date: any): string {
        let date = new Date(_date);
        let diff = Math.floor(DateUtils.TODAY - date.getTime());
        let days = Math.floor(diff / DateUtils.ONE_DAY);
        let months = Math.floor(days / 31);
        let years = Math.floor(months / 12);
        return years === 0 ? 'Méně než rok' : years.toString();
    }

}
