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

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MockHeroService } from '../testing/hero.service';
import { HeroesComponent } from './heroes.component';


describe('HeroesComponent', () => {

    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule
                ],
                declarations: [
                    HeroesComponent
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
                fixture = TestBed.createComponent(HeroesComponent);
            })
            .catch(reason => {
                console.error(`Unable to compile components: ${reason}`);
            });
    }));

    it('should create the component', async(() => {
        const target = fixture.debugElement.componentInstance;

        expect(target).toBeDefined();
    }));

    it('should initialise correctly', async(() => {
        const target = fixture
            .debugElement
            .componentInstance as HeroesComponent;

        expect(target.heroes).toBeDefined();
        expect(target.heroes.length).toBe(0);
        expect(target.selectedHero).toBeUndefined();
    }));

    describe('add()', () => {

        describe('when name is not specified', () => {

            let heroService: HeroService;
            let target: HeroesComponent;

            beforeEach(() => {
                heroService = fixture
                    .debugElement
                    .injector
                    .get(HeroService);
                spyOn(heroService, 'create');

                target = fixture
                    .debugElement
                    .componentInstance as HeroesComponent;
            });

            it('should not do anything', () => {
                target.add('');

                expect(heroService.create).not.toHaveBeenCalled();
            });

        });

        describe('when name is specified', () => {

            let heroService: HeroService;
            let target: HeroesComponent;

            beforeEach(async(() => {
                heroService = fixture
                    .debugElement
                    .injector
                    .get(HeroService);
                spyOn(heroService, 'create')
                    .and
                    .returnValue(Promise.resolve({
                        id: 1,
                        name: 'Superman'
                    }));

                target = fixture
                    .debugElement
                    .componentInstance as HeroesComponent;
                target.add('Superman');
            }));

            it('should create a hero', () => {
                expect(heroService.create).toHaveBeenCalled();
            });

            it('should update properties correctly', async(() => {
                expect(target.heroes.length).toBe(1);
                expect(target.selectedHero).toBeNull();
            }));

        });

    });

    describe('select()', () => {

        it('should update properties correctly', () => {
            const hero: Hero = {
                id: 1,
                name: 'Superman'
            };
            const target = fixture
                .debugElement
                .componentInstance as HeroesComponent;

            target.select(hero);

            expect(target.selectedHero).toBe(hero);
        });

    });

    describe('delete()', () => {

        describe('when hero to delete is not in \'heroes\'', () => {

            let target: HeroesComponent;

            beforeEach(() => {
                const heroService = fixture
                    .debugElement
                    .injector
                    .get(HeroService);
                spyOn(heroService, 'delete')
                    .and
                    .returnValue(Promise.resolve());

                target = fixture
                    .debugElement
                    .componentInstance as HeroesComponent;
            });

            it('should not change \'heroes\'', async(() => {
                const hero: Hero = {
                    id: 1,
                    name: 'Superman'
                };
                target.delete(hero);

                expect(target.heroes.length).toBe(0);
            }));

        });

        describe('when hero to delete is in \'heroes\'', () => {

            let hero: Hero;
            let target: HeroesComponent;

            beforeEach(() => {
                hero = {
                    id: 1,
                    name: 'Superman'
                };
                const heroService = fixture
                    .debugElement
                    .injector
                    .get(HeroService);
                spyOn(heroService, 'create')
                    .and
                    .returnValue(Promise.resolve(hero));
                spyOn(heroService, 'delete')
                    .and
                    .returnValue(Promise.resolve());

                target = fixture
                    .debugElement
                    .componentInstance as HeroesComponent;
                target.add(hero.name);
            });

            it('should update \'heroes\' correctly', () => {
                target.delete(hero);

                fixture
                    .whenStable()
                    .then(() => {
                        expect(target.heroes.length).toBe(0);
                    });
            });

        });

        describe('when hero to delete is selected', () => {

            let hero: Hero;
            let target: HeroesComponent;

            beforeEach(() => {
                const heroService = fixture
                    .debugElement
                    .injector
                    .get(HeroService);
                spyOn(heroService, 'delete')
                    .and
                    .returnValue(Promise.resolve());

                hero = {
                    id: 1,
                    name: 'Superman'
                };
                target = fixture
                    .debugElement
                    .componentInstance as HeroesComponent;
                target.select(hero);
            });

            it('should unselect it', fakeAsync(() => {
                target.delete(hero);
                tick();

                expect(target.selectedHero).toBeNull();
            }));

        });

    });

    describe('goToDetail()', () => {

        let router: Router;
        let hero: Hero;
        let target: HeroesComponent;

        beforeEach(() => {
            router = fixture
                .debugElement
                .injector
                .get(Router);
            spyOn(router, 'navigate');

            hero = {
                id: 1,
                name: 'Superman'
            };
            target = fixture
                .debugElement
                .componentInstance as HeroesComponent;
            target.select(hero);
        });

        it('should route correctly', () => {
            target.goToDetail();

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
            const heroService = fixture
                .debugElement
                .injector
                .get(HeroService);
            spyOn(heroService, 'getHeroes')
                .and
                .returnValue(Promise.resolve([
                    {
                        id: 1,
                        name: 'Superman'
                    }
                ]));

            target = fixture.debugElement;

            fixture.detectChanges();
            tick();
        }));

        it('should render correct heroes', () => {
            fixture.detectChanges();

            const listItems = target.queryAll(By.css('li'));

            expect(listItems.length).toBe(1);
            expect(listItems[0].children[0].nativeElement.textContent).toContain('1');
            expect(listItems[0].children[1].nativeElement.textContent).toContain('Superman');
        });

    });

});
