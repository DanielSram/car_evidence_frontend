import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {AppConfigService} from './app-config.service';

/**
 * Service class for Lending entities
 */
@Injectable()
export class LendingService {

    private URL: string;
    private options: RequestOptions;

    /**
     * @constructor
     * @param http
     * @param appConfig
     */
    constructor(private http: Http, private appConfig: AppConfigService) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
        this.options = new RequestOptions({headers: headers});
        this.URL = this.appConfig.getServerURL() + '/lendings';
    }

    /**
     * Fetches all Lendings
     * @returns {Observable<Response>}
     */
    getAllLendings() {
        return this.http.get(this.URL).map(res => res.json());
    }

    /**
     * Creates a new lending
     * @param lending
     * @returns {Observable<Response>}
     */
    createLending(lending: Lending) {
        // console.log('LendingService: creating lending', lending);
        return this.http.post(this.URL, lending, this.options);
    }

    /**
     * Retrieves a lending based on his id.
     * @param id
     */
    getLendingById(id: number): Observable<any> {
        return this.http.get(this.URL + '/' + id, {})
            .map((res: Response) => res.json());
    }

}
