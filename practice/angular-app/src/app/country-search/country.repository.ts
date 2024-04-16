import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from './country.model';
import { Observable, catchError, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryRepositoryService {
  private readonly BASE_URL = 'https://restcountries.com/v3.1';
  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.BASE_URL}/all`).pipe(
      delay(Math.random() * 1000),
      catchError(() => of([]))
    );
  }

  public getByName(name: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${this.BASE_URL}/name/${name}`).pipe(
      delay(Math.random() * 1000),
      catchError(() => of([]))
    );
  }

  public getByCapital(capital: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.BASE_URL}/capital/${capital}`)
      .pipe(
        delay(Math.random() * 1000),
        catchError(() => of([]))
      );
  }

  public getByLanguage(language: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${this.BASE_URL}/lang/${language}`)
      .pipe(
        delay(Math.random() * 1000),
        catchError(() => of([]))
      );
  }
}
