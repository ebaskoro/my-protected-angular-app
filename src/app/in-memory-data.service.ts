import { InMemoryDbService } from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        const heroes = [
            {
                id: 1,
                name: 'Dare Devil'
            },
            {
                id: 2,
                name: 'Luke Cage'
            },
            {
                id: 3,
                name: 'Jessica Jones'
            },
            {
                id: 4,
                name: 'Iron Fist'
            }
        ];
        return {
            heroes
        };
    }

}
