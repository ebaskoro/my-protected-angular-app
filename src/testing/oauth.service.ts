export class MockOAuthService {

    tokenValidationHandler: any;


    configure(): void {
    }


    loadDiscoveryDocumentAndTryLogin(): Promise<object> {
        return Promise.reject(new Object());
    }


    loadUserProfile(): Promise<object> {
        return Promise.resolve(new Object());
    }


    hasValidIdToken(): boolean {
        return false;
    }


    hasValidAccessToken(): boolean {
        return false;
    }


    getIdentityClaims(): any {
        return null;
    }


    getAccessToken(): string {
        return null;
    }


    initImplicitFlow(): void {
    }


    logOut(): void {
    }

}
