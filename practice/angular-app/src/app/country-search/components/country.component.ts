import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Country } from '../country.model';

@Component({
  selector: 'app-country',
  template: `
    <div class="country">
      <p>{{ country.name.official }}</p>
      <span>Population: {{ country.population }}</span>
      <img [src]="country.flags.png" alt="" />
    </div>
  `,
  standalone: true,
  styles: `
    .country {
        display: flex;
        flex-direction: column;
        padding: 10px;
        text-align: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent {
  @Input({ required: true }) country!: Country;
}
