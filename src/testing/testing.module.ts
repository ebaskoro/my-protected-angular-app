import { NgModule } from '@angular/core';

import { MockHeroSearchComponent } from './hero-search.component';

import { MockHeroService } from './hero.service';


@NgModule({
    declarations: [
        MockHeroSearchComponent
    ],
    providers: [
        MockHeroService
    ],
    exports: [
        MockHeroSearchComponent
    ]
})
export class TestingModule {
}
