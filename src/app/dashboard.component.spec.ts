import { DebugElement } from '@angular/core';
import {
    async,
    ComponentFixture,
    inject,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { TestingModule } from '../testing/testing.module';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { MockHeroService } from '../testing/hero.service';
import { DashboardComponent } from './dashboard.component';


describe('DashboardComponent', () => {

    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule,
                    TestingModule
                ],
                declarations: [
                    DashboardComponent
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
                fixture = TestBed.createComponent(DashboardComponent);
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
            .componentInstance as DashboardComponent;
        const actual = target.heroes;

        expect(actual).toBeDefined();
        expect(actual.length).toBe(0);
    }));

    describe('when rendered', () => {

        let target: DebugElement;

        beforeEach(() => {
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

            fixture.detectChanges();

            target = fixture.debugElement;
        });

        it('should render heroes', () => {
            fixture
                .whenStable()
                .then(() => {
                    fixture.detectChanges();

                    const linkElements = target.queryAll(By.css('a.col-1-4'));

                    expect(linkElements.length).toBe(1);
                    expect(linkElements[0].nativeElement.href).toContain('hero/1');
                });
        });

    });

});
