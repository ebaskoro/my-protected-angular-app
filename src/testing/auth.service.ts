export class MockAuthService {

    get isLoggedIn(): boolean {
        return false;
    }


    get user(): any {
        return null;
    }


    get accessToken(): string {
        return null;
    }


    logIn(): void {
    }


    logOut(): void {
    }

}
