import { Injectable } from '@angular/core';

import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';

import { environment } from '../environments/environment';


/**
 * Authentication service.
 *
 */
@Injectable()
export class AuthService {

    constructor(private readonly oauthService: OAuthService) {
        this.oauthService
            .configure({
                issuer: environment.oauth.issuer,
                requireHttps: false,
                clientId: environment.oauth.clientId,
                redirectUri: window.location.origin,
                scope: `openid profile ${environment.oauth.scope}`
            });
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(() => {
                if (this.isLoggedIn) {
                    this.oauthService.loadUserProfile();
                }
            })
            .catch(reason => {
                console.error(`Unable to login: ${reason}`);
            });
    }


    get isLoggedIn(): boolean {
        return this.oauthService.hasValidIdToken()
            && this.oauthService.hasValidAccessToken();
    }


    get user(): any {
        const claims = this.oauthService.getIdentityClaims() as any;

        if (!claims) {
            return null;
        }

        return {
            name: claims.name
        };
    }


    get accessToken(): string {
        return this.oauthService.getAccessToken();
    }


    logIn(): void {
        this.oauthService.initImplicitFlow();
    }


    logOut(): void {
        this.oauthService.logOut();
    }

}
