import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {AppConfigService} from './app-config.service';

/**
 * Service class for Client entities
 */
@Injectable()
export class ClientService {

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
        this.URL = this.appConfig.getServerURL() + '/clients';
    }

    /**
     * Fetches all clients
     */
    getAllClients() {
        return this.http.get(this.URL).map(res => res.json());
    }

    /**
     * Creates a new client
     * @param client
     * @returns {Observable<Response>}
     */
    createClient(client: Client): Observable<Response> {
        return this.http.post(this.URL, JSON.stringify(client), this.options);
    }

    /**
     * Retrieves a client based on his id.
     * @param id
     * @returns {Observable<Response>}
     */
    getClientById(id: number): Observable<Response> {
        return this.http.get(this.URL + '/' + id, {})
            .map((res: Response) => res.json());
    }

    /**
     * Updates existing client
     * @param client
     */
    editClient(client: Client): void {
        this.http.put(this.URL + '/' + client.id, JSON.stringify(client), this.options);
    }
}
