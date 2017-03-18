import { Injectable } from '@angular/core';

/**
 * Configuration class
 */
@Injectable()
export class AppConfigService {

    /**
     * Returns base server URL
     */
    public getServerURL(): string {
        return 'http://localhost:8080/car-evidence-js';
    }

}
