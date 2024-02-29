import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountrySearchComponent } from './country-search/containers/country-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountrySearchComponent],
  template: `<app-countries-search></app-countries-search> `,
})
export class AppComponent {}
