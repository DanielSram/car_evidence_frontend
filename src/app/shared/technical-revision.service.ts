import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {AppConfigService} from './app-config.service';

/**
 * Service class for Technical Revision entities.
 */
@Injectable()
export class TechnicalRevisionService {

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
        this.URL = this.appConfig.getServerURL() + '/revisions';
    }

    /**
     * Creates a new Technical Revision.
     * @param tr
     * @returns {Observable<Response>}
     */
    createTechnicalRevision(tr: TechnicalRevision): Observable<Response> {
        return this.http.post(this.URL, JSON.stringify(tr), this.options);
    }

    /**
     * Fetches all Technical Revisions for given car ID.
     * @param id
     * @returns {Observable<Response>}
     */
    getRevisionsForCar(id: number) {
        return this.http.get(this.URL + '/forCar/' + id, {})
            .map((res: Response) => res.json());
    }

}
