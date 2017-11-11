import { TestBed } from '@angular/core/testing';
import {
    Http,
    HttpModule,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AuthService } from './auth.service';
import { MockAuthService } from '../testing/auth.service';
import { HeroSearchService } from './hero-search.service';


describe('HeroSearchService', () => {

    let mockBackend: MockBackend;
    let target: HeroSearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useClass: MockAuthService
                },
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                HeroSearchService
            ]
        });

        const authService = TestBed.get(AuthService);
        spyOnProperty(authService, 'accessToken', 'get')
            .and
            .returnValue('dummy token');

        mockBackend = TestBed.get(XHRBackend) as MockBackend;
        target = TestBed.get(HeroSearchService);
    });

    describe('search()', () => {

        describe('when endpoint has no errors', () => {

            beforeEach(() => {
                mockBackend
                    .connections
                    .subscribe(connection => {
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify([
                                {
                                    id: 1,
                                    name: 'Superman'
                                }
                            ])
                        })));
                    });
            });

            it('should return correctly', () => {
                target
                    .search('Su')
                    .subscribe(heroes => {
                        expect(heroes).toBeDefined();
                        expect(heroes.length).toBe(1);
                    });
            });

        });

        describe('when endpoint has errors', () => {

            beforeEach(() => {
                mockBackend
                    .connections
                    .subscribe(connection => {
                        connection.mockError(new Error('an error'));
                    });
            });

            it('should return correctly', () => {
                target
                    .search('Su')
                    .subscribe(null, error => {
                        expect(error.message).toBe('an error');
                    });
            });

        });

    });

});
