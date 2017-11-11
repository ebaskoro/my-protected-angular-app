import { DebugElement } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './auth.service';
import { MockAuthService } from '../testing/auth.service';
import { AppComponent } from './app.component';


describe('AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    RouterTestingModule
                ],
                providers: [
                    {
                        provide: AuthService,
                        useClass: MockAuthService
                    }
                ],
                declarations: [
                    AppComponent
                ],
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(AppComponent);
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
            .componentInstance as AppComponent;

        expect(target.title).toBe('Tour of Heroes');
        expect(target.isLoggedIn).toBeFalsy();
    }));

    describe('logIn()', () => {

        let authService: AuthService;
        let target: AppComponent;

        beforeEach(() => {
            authService = fixture
                .debugElement
                .injector
                .get(AuthService);
            spyOn(authService, 'logIn');

            target = fixture
                .debugElement
                .componentInstance as AppComponent;
        });

        it('should log user in', () => {
            target.logIn();

            expect(authService.logIn).toHaveBeenCalled();
        });

    });

    describe('logOut()', () => {

        let authService: AuthService;
        let target: AppComponent;

        beforeEach(() => {
            authService = fixture
                .debugElement
                .injector
                .get(AuthService);
            spyOn(authService, 'logOut');

            target = fixture
                .debugElement
                .componentInstance as AppComponent;
        });

        it('should log user out', () => {
            target.logOut();

            expect(authService.logOut).toHaveBeenCalled();
        });

    });

    describe('when rendered', () => {

        let target: DebugElement;

        beforeEach(async(() => {
            fixture.detectChanges();

            target = fixture.debugElement;
        }));

        it('should render title in a h1 tag', async(() => {
            const actual = target
                .query(By.css('h1'))
                .nativeElement
                .textContent;

            expect(actual).toContain('Tour of Heroes');
        }));

        describe('and user is not logged in', () => {

            it('should render no links', async(() => {
                const linkElements = target.queryAll(By.css('nav > a'));

                expect(linkElements.length).toBe(0);
            }));
        });

        describe('and user is logged in', () => {

            beforeEach(async(() => {
                const authService = fixture
                    .debugElement
                    .injector
                    .get(AuthService);
                spyOnProperty(authService, 'isLoggedIn', 'get')
                    .and
                    .returnValue(true);
                spyOnProperty(authService, 'user', 'get')
                    .and
                    .returnValue({
                        name: 'Alice'
                    });

                fixture.detectChanges();

                target = fixture.debugElement;
            }));

            it('should render correct links', async(() => {
                const linkElements = target.queryAll(By.css('nav > a'));

                expect(linkElements.length).toBe(2);
                expect(linkElements[0].nativeElement.href).toContain('dashboard');
                expect(linkElements[0].nativeElement.textContent).toContain('Dashboard');
                expect(linkElements[1].nativeElement.href).toContain('heroes');
                expect(linkElements[1].nativeElement.textContent).toContain('Heroes');
            }));
        });

    });

});
