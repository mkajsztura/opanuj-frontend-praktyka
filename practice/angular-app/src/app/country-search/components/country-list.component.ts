import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from '../country.model';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country.component';

@Component({
  selector: 'app-country-list',
  styles: `
    .list {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
  `,
  template: `
    <div class="list">
      @if(countries.length) { @for(country of countries; track
      country.name.official) {
      <app-country [country]="country" />
      } } @else { No results }
    </div>
  `,
  standalone: true,
  imports: [CommonModule, CountryComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryListComponent {
  @Input({ required: true }) countries: Country[] = [];
}
