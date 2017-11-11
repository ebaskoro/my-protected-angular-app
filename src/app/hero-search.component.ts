import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { Hero } from './hero';


/**
 * Hero search component.
 *
 */
@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: [
        './hero-search.component.scss'
    ]
})
export class HeroSearchComponent implements OnInit {

    private _heroes: Observable<Hero[]>;
    private _terms = new Subject<string>();


    constructor(
        private readonly heroSearchService: HeroSearchService,
        private readonly router: Router) {
    }


    ngOnInit(): void {
        this._heroes = this._terms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => {
                if (term) {
                    return this.heroSearchService
                        .search(term);
                }

                return Observable.of<Hero[]>([]);
            })
            .catch(error => {
                console.error(error);
                return Observable.of<Hero[]>([]);
            });
    }


    get heroes(): Observable<Hero[]> {
        return this._heroes;
    }


    search(term: string): void {
        this._terms
            .next(term);
    }


    goToDetail(hero: Hero): void {
        this.router
            .navigate([
                '/hero',
                hero.id
            ]);
    }

}
