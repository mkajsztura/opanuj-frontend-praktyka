import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal } from '@angular/core';
import { InputFieldComponent } from '../../shared/components/input-field.component';
import { SelectFieldComponent } from '../../shared/components/select-field.component';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-countries-search-form',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, SelectFieldComponent],
  template: `
    <div class="form">
      <div class="form-field">
        <app-input-field
          [value]="searchInput()"
          (onChange)="onSearchInputChange($event)"
        />
      </div>
      <div class="form-field">
        <app-select-field
          title="Search By"
          [value]="searchBy()"
          [options]="searchByOptions"
          (onChange)="onSearchByChange($event)"
        />
      </div>
      <div class="form-field">
        <app-select-field
          title="Sort By"
          [value]="sortBy()"
          [options]="sortByOptions"
          (onChange)="onSortByChange($event)"
        />
      </div>
    </div>
  `,
  styles: `
  .form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
  }
  .form-field {
    padding: 10px;
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchFormComponent {
  searchBy: Signal<string>;
  sortBy: Signal<string>;
  searchInput: Signal<string>;
  readonly searchByOptions: string[] = ['name', 'capital', 'language'];
  readonly sortByOptions: string[] = ['', 'alphabetical', 'population'];

  constructor(private countriesService: CountryService) {
    this.searchBy = this.countriesService.searchBySignal;
    this.sortBy = this.countriesService.sortBySignal;
    this.searchInput = this.countriesService.searchInputSignal;
  }

  onSearchByChange(value: string) {
    this.countriesService.searchBySignal.set(value);
  }

  onSearchInputChange(value: string) {
    this.countriesService.searchInputSignal.set(value);
  }

  onSortByChange(value: string) {
    this.countriesService.sortBySignal.set(value);
  }
}
