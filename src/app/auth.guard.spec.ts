import { inject, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


describe('AuthGuard', () => {

    beforeEach(() => {
        class AuthServiceStub {

            get isLoggedIn(): boolean {
                return false;
            }

        }

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthServiceStub
                },
                AuthGuard
            ]
        });
    });

    describe('when user is not logged in', () => {

        let target: AuthGuard;

        beforeEach(inject([AuthGuard, AuthService], (authGuard, authService) => {
            spyOnProperty(authService, 'isLoggedIn', 'get')
                .and
                .returnValue(false);

            target = authGuard;
        }));

        it('should not activate', () => {
            const actual = target.canActivate();

            expect(actual).toBeFalsy();
        });

    });

    describe('when user is logged in', () => {

        let target: AuthGuard;

        beforeEach(inject([AuthGuard, AuthService], (authGuard, authService) => {
            spyOnProperty(authService, 'isLoggedIn', 'get')
                .and
                .returnValue(true);

            target = authGuard;
        }));

        it('should activate', () => {
            const actual = target.canActivate();

            expect(actual).toBeTruthy();
        });

    });

});
