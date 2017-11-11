import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from './hero';
import { HeroService } from './hero.service';


/**
 * Hero detail component.
 *
 */
@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: [
        './hero-detail.component.scss'
    ]
})
export class HeroDetailComponent implements OnInit {

    @Input()
    hero: Hero;


    constructor(
        private readonly heroService: HeroService,
        private readonly route: ActivatedRoute,
        private readonly location: Location) {
    }


    ngOnInit(): void {
        this.route
            .paramMap
            .switchMap((paramMap: ParamMap) => {
                const id = +paramMap.get('id');
                return this.heroService.getHero(id);
            })
            .subscribe(hero => this.hero = hero);
    }


    goBack(): void {
        this.location.back();
    }


    save(): void {
        this.heroService
            .update(this.hero)
            .then(() => this.goBack());
    }

}
