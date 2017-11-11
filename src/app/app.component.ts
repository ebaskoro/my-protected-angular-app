import { Component } from '@angular/core';

import { AuthService } from './auth.service';


/**
 * App component.
 *
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss'
    ]
})
export class AppComponent {

    constructor(private readonly authService: AuthService) {
    }


    /**
     * Gets the title.
     *
     * @returns {string} The title.
     */
    get title(): string {
        return 'Tour of Heroes';
    }


    get isLoggedIn(): boolean  {
        return this.authService.isLoggedIn;
    }


    get name(): string {
        return this.authService.user.name;
    }


    logIn(): void {
        this.authService.logIn();
    }


    logOut(): void {
        this.authService.logOut();
    }

}
