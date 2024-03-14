import { Injectable, inject } from '@angular/core';
import {
  injectMutation,
  injectQuery,
} from '@tanstack/angular-query-experimental';
import { UserRepositoryService } from './user.repository';
import { User } from './user.model';
import { USERS_QUERY_KEY } from './user-query.const';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userRepository = inject(UserRepositoryService);

  userQuery = injectQuery(() => ({
    queryKey: [USERS_QUERY_KEY],
    queryFn: () => this.userRepository.getUsers(),
  }));

  userAddMutation = injectMutation((client) => ({
    mutationFn: (user: User) => this.userRepository.getUser(user),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });
    },
  }));
}
