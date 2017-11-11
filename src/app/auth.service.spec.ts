import { async, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { OAuthService } from 'angular-oauth2-oidc';
import { MockOAuthService } from '../testing/oauth.service';

import { AuthService } from './auth.service';


describe('AuthService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: OAuthService,
                    useClass: MockOAuthService
                },
                AuthService
            ]
        });

        console.error = () => null;
    });

    describe('when created', () => {

        describe('and not logged in', () => {

            let target: AuthService;

            beforeEach(inject([AuthService, OAuthService], (authService, oauthService) => {
                spyOn(oauthService, 'hasValidIdToken')
                    .and
                    .returnValue(false);
                spyOn(oauthService, 'hasValidAccessToken')
                    .and
                    .returnValue(false);

                target = authService;
            }));

            it('should initialise correctly', () => {
                expect(target.isLoggedIn).toBeFalsy();
                expect(target.user).toBeNull();
                expect(target.accessToken).toBeNull();
            });

        });

        describe('and logged in', () => {

            let oauthService: OAuthService;
            let target: AuthService;

            beforeEach(async(() => {
                oauthService = TestBed.get(OAuthService);
                spyOn(oauthService, 'loadDiscoveryDocumentAndTryLogin')
                    .and
                    .returnValue(Promise.resolve(new Object()));
                spyOn(oauthService, 'hasValidIdToken')
                    .and
                    .returnValue(true);
                spyOn(oauthService, 'hasValidAccessToken')
                    .and
                    .returnValue(true);
                spyOn(oauthService, 'loadUserProfile')
                    .and
                    .returnValue(Promise.resolve(new Object()));
                spyOn(oauthService, 'getIdentityClaims')
                    .and
                    .returnValue({
                        name: 'Alice'
                    });
                spyOn(oauthService, 'getAccessToken')
                    .and
                    .returnValue('dummy access token');

                target = TestBed.get(AuthService);
            }));

            it('should initialise correctly', async(() => {
                expect(oauthService.loadUserProfile).toHaveBeenCalled();
                expect(target.isLoggedIn).toBeTruthy();
                expect(target.user).not.toBeNull();
                expect(target.user.name).toBe('Alice');
                expect(target.accessToken).toBe('dummy access token');
            }));

        });

    });

    describe('logIn()', () => {

        let oauthService: OAuthService;
        let target: AuthService;

        beforeEach(inject([AuthService], (authService) => {
            oauthService = TestBed.get(OAuthService);
            spyOn(oauthService, 'initImplicitFlow');

            target = authService;
        }));

        it('should log user in', () => {
            target.logIn();

            expect(oauthService.initImplicitFlow).toHaveBeenCalled();
        });

    });

    describe('logOut()', () => {

        let oauthService: OAuthService;
        let target: AuthService;

        beforeEach(inject([AuthService], (authService) => {
            oauthService = TestBed.get(OAuthService);
            spyOn(oauthService, 'logOut');

            target = authService;
        }));

        it('should log user out', () => {
            target.logOut();

            expect(oauthService.logOut).toHaveBeenCalled();
        });

    });

});
