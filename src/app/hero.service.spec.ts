import {
    inject,
    TestBed
} from '@angular/core/testing';
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
import { Hero } from './hero';
import { HeroService } from './hero.service';


describe('HeroService', () => {

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
                HeroService
            ]
        });

        const authService = TestBed.get(AuthService);
        spyOnProperty(authService, 'accessToken', 'get')
            .and
            .returnValue('dummy token');
    });

    describe('getHeroes()', () => {

        describe('when endpoint has no errors', () => {

            let target: HeroService;

            beforeEach(inject([HeroService, XHRBackend], (heroService, mockBackend) => {
                    target = heroService;

                    mockBackend
                        .connections
                        .subscribe(connection => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify([
                                        { id: 1, name: 'Superman' }
                                    ])
                            })));
                        });
            }));

            it('should return correctly', () => {
                target
                    .getHeroes()
                    .then(heroes => {
                        expect(heroes).toBeDefined();
                        expect(heroes.length).toBe(1);
                    });
            });

        });

        describe('when endpoint has errors', () => {

            let target: HeroService;

            beforeEach(inject([HeroService, XHRBackend], (heroService, mockBackend) => {
                    target = heroService;

                    mockBackend
                        .connections
                        .subscribe(connection => {
                            connection.mockError(new Error('an error'));
                        });

                    console.error = () => null;
            }));

            it('should return correctly', () => {
                target
                    .getHeroes()
                    .catch(reason => {
                        expect(reason).toBe('an error');
                    });
            });

        });

    });

    describe('getHero()', () => {

        describe('when endpoint has no errors', () => {

            let target: HeroService;

            beforeEach(inject([HeroService, XHRBackend], (heroService, mockBackend) => {
                    target = heroService;

                    mockBackend
                        .connections
                        .subscribe(connection => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify({
                                    id: 1,
                                    name: 'Superman'
                                })
                            })));
                        });
            }));

            it('should return correctly', () => {
                target
                    .getHero(1)
                    .then(hero => {
                        expect(hero).toBeDefined();
                        expect(hero.id).toBe(1);
                    });
            });

        });

    });

    describe('create()', () => {

        describe('when endpoint has no errors', () => {

            let target: HeroService;

            beforeEach(inject([HeroService, XHRBackend], (heroService, mockBackend) => {
                    target = heroService;

                    mockBackend
                        .connections
                        .subscribe(connection => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify({
                                    id: 1,
                                    name: 'Superman'
                                })
                            })));
                        });
            }));

            it('should return correctly', () => {
                target
                    .create('Superman')
                    .then(hero => {
                        expect(hero).toBeDefined();
                        expect(hero.id).toBe(1);
                    });
            });

        });

    });

    describe('update()', () => {

        describe('when endpoint has no errors', () => {

            let target: HeroService;

            beforeEach(inject([HeroService, XHRBackend], (heroService, mockBackend) => {
                    target = heroService;

                    mockBackend
                        .connections
                        .subscribe(connection => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                body: JSON.stringify({
                                    id: 1,
                                    name: 'Superman'
                                })
                            })));
                        });
            }));

            it('should return correctly', () => {
                const heroToUpdate: Hero = {
                    id: 1,
                    name: 'Superman'
                };

                target
                    .update(heroToUpdate)
                    .then(hero => {
                        expect(hero).toBeDefined();
                        expect(hero.id).toBe(1);
                    });
            });

        });

    });

    describe('delete()', () => {

        describe('when endpoint has no errors', () => {

            let target: HeroService;

            beforeEach(inject([HeroService, XHRBackend], (heroService, mockBackend) => {
                    target = heroService;

                    mockBackend
                        .connections
                        .subscribe(connection => {
                            connection.mockRespond(new Response(new ResponseOptions({
                                status: 201
                            })));
                        });
            }));

            it('should return correctly', () => {
                target
                    .delete(1)
                    .then(() => expect(true).toBe(true));
            });

        });

    });

});
