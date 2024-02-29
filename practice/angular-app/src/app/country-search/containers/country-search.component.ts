import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  effect,
} from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country.model';
import { CountryListComponent } from '../components/country-list.component';
import { CountrySearchFormComponent } from './country-search-form.component';

@Component({
  selector: 'app-countries-search',
  standalone: true,
  imports: [CommonModule, CountrySearchFormComponent, CountryListComponent],
  template: `
    <div class="country-search">
      <app-countries-search-form></app-countries-search-form>
      @if(!isLoading()) {
      <app-country-list [countries]="countries()" />
      } @else{
      <div>Loading</div>
      }
    </div>
  `,
  styles: `
  .country-search {
    text-align: center;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchComponent {
  countries: Signal<Country[]>;
  isLoading: Signal<boolean>;

  constructor(private countriesService: CountryService) {
    this.countries = this.countriesService.getCountries();
    this.isLoading = this.countriesService.isLoadingSignal;
  }
}
