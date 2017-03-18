import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {AppConfigService} from './app-config.service';

/**
 * Service class for car entities
 */
@Injectable()
export class TractorService {

    private URL_BASE: string;
    private options: RequestOptions;

    /**
     * @constructor
     * @param http
     * @param appConfig
     */
    constructor(private http: Http, private appConfig: AppConfigService) {
        let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json',});
        this.options = new RequestOptions({headers: headers});
        this.URL_BASE = this.appConfig.getServerURL();
    }

    /**
     * Fetches all cars
     * @returns {Observable<Response>}
     */
    getCars() {
        return this.http.get(this.URL_BASE + '/cars').map(res => res.json());
    }

    /**
     * Finds cars with forthcoming technical revision.
     */
    getCarsWithForthcomingRevision() {
        return this.http.get(this.URL_BASE + '/cars/withForthcomingRevision', {})
            .map((res: Response) => res.json());
    }

    /**
     * Find cars based on given filtering parameters.
     * @param params
     * @returns {Observable<Response>}
     */
    findAvailableCars(params: SearchParams) {
        let parameters = new URLSearchParams();
        parameters.set('type', params.type);
        parameters.set('availableFrom', params.availableFrom);
        parameters.set('availableTo', params.availableTo);
        console.log('Finding available cars with parameters: ', parameters);

        return this.http.get(this.URL_BASE + '/cars/findAvailable',
            {search: parameters})
            .map(res => res.json());
    }

    /**
     * Find cars based on given filtering parameters.
     * @param params
     * @returns {Observable<Response>}
     */
    findCars(params: SearchParams) {
        let parameters = new URLSearchParams();
        parameters.set('acquiredFrom', params.acquiredFrom);
        parameters.set('acquiredTo', params.acquiredTo);

        return this.http.get(this.URL_BASE + '/cars/find',
            {search: parameters})
            .map(res => res.json());
    }

    /**
     * Creates a new car
     * @param car
     * @returns {Observable<Response>}
     */
    addCar(car: any) {
        let headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json',});
        let options = new RequestOptions({headers: headers});

        return this.http.post(
            this.URL_BASE + '/cars/new',
            JSON.stringify(car),
            options);
    }

    /**
     * Retrieves a car based on its id.
     * @param id
     */
    getCarById(id: number): Observable<any> {
        return this.http.get(this.URL_BASE + '/cars/' + id, {})
            .map((res: Response) => res.json());
    }

    /**
     * Updates existing car
     * @param car
     * @returns {Observable<?>}
     */
    editCar(car: CarItem): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        let options = new RequestOptions({headers: headers});

        return this.http.put(this.URL_BASE + '/cars', JSON.stringify(car), options);
    }
}
