import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, filter, map, of, switchMap } from 'rxjs';
import { Character } from '../types/Character';

@Injectable({
  providedIn: 'root',
})
export class CharacterSearchService {
  characters: Signal<Character[]>;
  name = signal<string>('');
  gender = signal<string>('');
  sortOption = signal<string>('');
  private readonly apiBaseUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {
    const name$ = toObservable(this.name).pipe(filter((name) => !!name));
    const gender$ = toObservable(this.gender);

    const charactersSource$ = combineLatest([name$, gender$]).pipe(
      switchMap(([name, gender]) => {
        if (name !== '' || gender !== '') {
          return this.http
            .get<{ results: Character[] }>(
              `${this.apiBaseUrl}?name=${name}&gender=${gender}`
            )
            .pipe(map((response) => response.results || []));
        } else {
          return of([]);
        }
      })
    );

    const characterData = toSignal(charactersSource$, {
      initialValue: [],
    });

    this.characters = computed(() =>
      this.sortCharacters(characterData(), this.sortOption())
    );
  }

  sortCharacters(characters: Character[], sortOption: string): Character[] {
    return [...characters].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'created') {
        return new Date(a.created).getTime() - new Date(b.created).getTime();
      }
      return 0;
    });
  }
}
