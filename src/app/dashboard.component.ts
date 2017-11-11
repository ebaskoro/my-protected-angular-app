import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';


/**
 * Dashboard component.
 *
 */
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss'
    ]
})
export class DashboardComponent implements OnInit {

    private _heroes: Hero[] = [];


    constructor(private readonly heroService: HeroService) {
    }


    ngOnInit(): void {
        this.heroService
            .getHeroes()
            .then(heroes => this._heroes = heroes.slice(0, 4));
    }


    get heroes(): Hero[] {
        return this._heroes;
    }

}
