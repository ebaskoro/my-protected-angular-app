import { Hero } from '../app/hero';


export class MockHeroService {

    getHeroes(): Promise<Hero[]> {
        return Promise.reject('');
    }


    getHero(id: number): Promise<Hero> {
        return Promise.reject('');
    }


    create(name: string): Promise<Hero> {
        return Promise.reject('');
    }


    update(hero: Hero): Promise<Hero> {
        return Promise.reject('');
    }


    delete(id: number): Promise<void> {
        return Promise.reject('');
    }

}
