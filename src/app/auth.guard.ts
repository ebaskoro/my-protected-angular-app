import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';


/**
 * Authenticated route guard.
 *
 */
@Injectable()
export class AuthGuard implements CanActivate {

    /**
     * Creates an authenticated route guard.
     *
     * @param {AuthService} authService Authentication service to use.
     */
    constructor(private readonly authService: AuthService) {
    }


    /**
     * Checks whether the route can be activated or not.
     *
     * @returns {boolean} True if user is authenticated or false otherwise.
     */
    canActivate(): boolean {
        return this.authService.isLoggedIn;
    }

}
