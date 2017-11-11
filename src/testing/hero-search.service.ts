import { Observable } from 'rxjs/Observable';

import { Hero } from '../app/hero';


export class MockHeroSearchService {

    search(term: string): Observable<Hero[]> {
        return null;
    }

}
