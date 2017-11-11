import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../environments/environment';
import { Hero } from './hero';
import { AuthService } from './auth.service';


/**
 * Hero search service.
 *
 */
@Injectable()
export class HeroSearchService {

    private readonly url = `${environment.baseApiUrl}/heroes`;
    private readonly headers = new Headers({
        'Content-Type': 'application/json'
    });


    constructor(
        private readonly http: Http,
        private readonly authService: AuthService) {
        this.headers.append('Authorization', `Bearer ${authService.accessToken}`);
    }


    search(term: string): Observable<Hero[]> {
        const url = `${this.url}?name=${term}`;
        const options: RequestOptionsArgs = {
            headers: this.headers
        };
        return this.http
            .get(url, options)
            .map(response => response.json() as Hero[]);
    }

}
