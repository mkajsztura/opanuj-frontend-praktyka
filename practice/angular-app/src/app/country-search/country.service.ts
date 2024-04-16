import { Injectable, Signal, computed, signal } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  switchMap,
  tap,
} from 'rxjs';
import { Country } from './country.model';
import { CountryRepositoryService } from './country.repository';

import { toObservable, toSignal } from '@angular/core/rxjs-interop';
@Injectable({ providedIn: 'root' })
export class CountryService {
  searchInputSignal = signal('');
  searchBySignal = signal('name');
  sortBySignal = signal('');
  isLoadingSignal: Signal<boolean>;
  countriesSignal: Signal<Country[]>;
  private isLoadingSubject = new BehaviorSubject(false);

  constructor(private countriesRepository: CountryRepositoryService) {
    const countriesSource = toSignal(
      combineLatest([
        toObservable(this.searchInputSignal).pipe(debounceTime(300)),
        toObservable(this.searchBySignal),
      ]).pipe(
        tap(() => this.isLoadingSubject.next(true)),
        switchMap(([searchInput, searchBy]) => {
          if (searchInput && searchBy === 'name') {
            return this.countriesRepository.getByName(searchInput);
          }
          if (searchInput && searchBy === 'capital') {
            return this.countriesRepository.getByCapital(searchInput);
          }

          if (searchInput && searchBy === 'language') {
            return this.countriesRepository.getByLanguage(searchInput);
          }
          return this.countriesRepository.getAll();
        }),
        tap(() => this.isLoadingSubject.next(false))
      ),
      {
        initialValue: [],
      }
    );

    this.countriesSignal = computed(() => {
      const sortByValue = this.sortBySignal();
      const countries = countriesSource();
      if (sortByValue === 'alphabetical') {
        return this.sortByName(countries);
      }

      if (sortByValue === 'population') {
        return this.sortByPopulation(countries);
      }

      return countries;
    });

    this.isLoadingSignal = toSignal(this.isLoadingSubject.asObservable(), {
      initialValue: false,
    });
  }

  getCountries(): Signal<Country[]> {
    return this.countriesSignal;
  }

  sortByName(countries: Country[]) {
    return [...countries].sort((countryA, countryB) =>
      countryA.name.official.localeCompare(countryB.name.official)
    );
  }

  sortByPopulation(countries: Country[]): Country[] {
    return [...countries].sort(
      (countryA, countryB) => countryA.population - countryB.population
    );
  }
}
