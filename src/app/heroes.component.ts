import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';


/**
 * Heroes component.
 *
 */
@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: [
        './heroes.component.scss'
    ]
})
export class HeroesComponent implements OnInit {

    private _heroes: Hero[] = [];
    private _hero: Hero;


    constructor(
        private readonly heroService: HeroService,
        private readonly router: Router) {
    }


    ngOnInit(): void {
        this.heroService
            .getHeroes()
            .then(heroes => this._heroes = heroes);
    }


    get heroes(): Hero[] {
        return this._heroes;
    }


    get selectedHero(): Hero {
        return this._hero;
    }


    add(name: string): void {
        name = name.trim();

        if (!name) {
            return;
        }

        this.heroService
            .create(name)
            .then(hero => {
                this._heroes.push(hero);
                this._hero = null;
            });
    }


    select(hero: Hero): void {
        this._hero = hero;
    }


    delete(heroToDelete: Hero): void {
        this.heroService
            .delete(heroToDelete.id)
            .then(() => {
                this._heroes = this._heroes.filter(hero => hero !== heroToDelete);

                if (this._hero === heroToDelete) {
                    this._hero = null;
                }
            });
    }


    goToDetail(): void {
        this.router
            .navigate([
                '/hero',
                this._hero.id
            ]);
    }

}
