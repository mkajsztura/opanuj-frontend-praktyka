import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, lastValueFrom } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserRepositoryService {
  private http = inject(HttpClient);

  getUsers(): Promise<User[]> {
    return lastValueFrom(
      this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(delay(3000))
    );
  }

  getUser(user: User): Promise<User> {
    return lastValueFrom(
      this.http.post<User>('https://jsonplaceholder.typicode.com/users', user)
    );
  }
}
