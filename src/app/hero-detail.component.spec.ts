import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs/Observable';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MockHeroService } from '../testing/hero.service';
import { HeroDetailComponent } from './hero-detail.component';


describe('HeroDetailComponent', () => {

    let fixture: ComponentFixture<HeroDetailComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    RouterTestingModule
                ],
                declarations: [
                    HeroDetailComponent
                ],
                providers: [
                    {
                        provide: HeroService,
                        useClass: MockHeroService
                    }
                ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HeroDetailComponent);
            })
            .catch(reason => {
                console.error(`Unable to compile components: ${reason}`);
            });
    }));

    it('should create the component', () => {
        const target = fixture.debugElement.componentInstance;

        expect(target).toBeDefined();
    });

    it('should initialise correctly', () => {
        const target = fixture
            .debugElement
            .componentInstance as HeroDetailComponent;
        const actual = target.hero;

        expect(actual).toBeUndefined();
    });

    describe('goBack()', () => {

        let location: Location;
        let target: HeroDetailComponent;

        beforeEach(() => {
            location = fixture
                .debugElement
                .injector
                .get(Location);
            spyOn(location, 'back');

            target = fixture
                .debugElement
                .componentInstance as HeroDetailComponent;
        });

        it('should go back', () => {
            target.goBack();

            expect(location.back).toHaveBeenCalled();
        });

    });

    describe('save()', () => {

        let heroService: HeroService;
        let location: Location;
        let target: HeroDetailComponent;

        beforeEach(() => {
            heroService = fixture
                .debugElement
                .injector
                .get(HeroService);
            spyOn(heroService, 'update')
                .and
                .returnValue(Promise.resolve());
            location = fixture
                .debugElement
                .injector
                .get(Location);
            spyOn(location, 'back');

            target = fixture
                .debugElement
                .componentInstance as HeroDetailComponent;
        });

        it('should save the hero', fakeAsync(() => {
            target.save();
            tick();

            expect(heroService.update).toHaveBeenCalled();
            expect(location.back).toHaveBeenCalled();
        }));

    });

    describe('when rendered', () => {

        let target: DebugElement;

        beforeEach(fakeAsync(() => {
            const route = fixture
                .debugElement
                .injector
                .get(ActivatedRoute);
            spyOn(route, 'paramMap')
                .and
                .returnValue(Observable.of({
                    id: 1
                }));
            const heroService = fixture
                .debugElement
                .injector
                .get(HeroService);
            spyOn(heroService, 'getHero')
                .and
                .returnValue(Promise.resolve({
                    id: 1,
                    name: 'Superman'
                }));

            target = fixture.debugElement;

            fixture.detectChanges();
            tick();
        }));

        it('should initialise correctly', () => {
            fixture.detectChanges();

            const component = target.componentInstance as HeroDetailComponent;
            const actual = component.hero;

            expect(actual).toBeDefined();
            expect(actual.id).toBe(1);
            expect(actual.name).toBe('Superman');
        });

    });

});
