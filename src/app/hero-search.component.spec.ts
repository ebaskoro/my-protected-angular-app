import { DebugElement } from '@angular/core';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Hero } from './hero';
import { HeroSearchService } from './hero-search.service';
import { MockHeroSearchService } from '../testing/hero-search.service';
import { HeroSearchComponent } from './hero-search.component';


describe('HeroSearchComponent', () => {

    let fixture: ComponentFixture<HeroSearchComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule
                ],
                declarations: [
                    HeroSearchComponent
                ],
                providers: [
                    {
                        provide: HeroSearchService,
                        useClass: MockHeroSearchService
                    }
                ]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HeroSearchComponent);
            })
            .catch(reason => {
                console.error(`Unable to compile components: ${reason}`);
            });
    }));

    it('should create the component', async(() => {
        const target = fixture.debugElement.componentInstance;

        expect(target).toBeDefined();
    }));

    it('should initialise correctly', () => {
        const target = fixture
            .debugElement
            .componentInstance as HeroSearchComponent;

        expect(target.heroes).toBeUndefined();
    });

    describe('goToDetail()', () => {

        let router: Router;
        let target: HeroSearchComponent;

        beforeEach(() => {
            router = fixture
                .debugElement
                .injector
                .get(Router);
            spyOn(router, 'navigate');

            target = fixture
                .debugElement
                .componentInstance as HeroSearchComponent;
        });

        it('should route correctly', () => {
            const hero: Hero = {
                id: 1,
                name: 'Superman'
            };
            target.goToDetail(hero);

            expect(router.navigate).toHaveBeenCalled();
            expect(router.navigate).toHaveBeenCalledTimes(1);
            expect(router.navigate).toHaveBeenCalledWith([
                '/hero',
                hero.id
            ]);
        });

    });

    describe('when rendered', () => {

        let target: DebugElement;

        beforeEach(fakeAsync(() => {
            target = fixture.debugElement;

            fixture.detectChanges();
            tick();
        }));

        describe('search()', () => {

            let component: HeroSearchComponent;

            beforeEach(() => {
                component = target.componentInstance as HeroSearchComponent;
            });

            describe('and term is empty string', () => {

                it('should render no heroes', fakeAsync(() => {
                    component.search('');
                    tick(300);
                    fixture.detectChanges();

                    component
                        .heroes
                        .subscribe(heroes => {
                            expect(heroes).toBeDefined();
                            expect(heroes.length).toBe(0);
                        });
                }));

            });

            describe('and term is not an empty string', () => {

                describe('and search has no errors', () => {

                    beforeEach(() => {
                        const heroSearchService = fixture
                            .debugElement
                            .injector
                            .get(HeroSearchService);
                        spyOn(heroSearchService, 'search')
                            .and
                            .returnValue(Observable.of([
                                {
                                    id: 1,
                                    name: 'Superman'
                                }
                            ]));
                    });

                    it('should render correct heroes', fakeAsync(() => {
                        component.search('Su');
                        tick(300);
                        fixture.detectChanges();

                        const divElements = target.queryAll(By.css('div.search-result'));

                        expect(divElements.length).toBe(1);
                    }));

                });

                describe('and search has errors', () => {

                    beforeEach(() => {
                        const heroSearchService = fixture
                            .debugElement
                            .injector
                            .get(HeroSearchService);
                        spyOn(heroSearchService, 'search')
                            .and
                            .returnValue(Observable.throw('an error'));

                        console.error = () => null;
                    });

                    it('should render no heroes', fakeAsync(() => {
                        component.search('Su');
                        tick(300);
                        fixture.detectChanges();

                        component
                            .heroes
                            .subscribe(heroes => {
                                expect(heroes).toBeDefined();
                                expect(heroes.length).toBe(0);
                            });
                    }));

                });

            });

        });

    });

});
