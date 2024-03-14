import { Component, inject } from '@angular/core';

import {
  injectMutation,
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { USERS_QUERY_KEY } from './user-query.const';
import { User } from './user.model';
import { UserRepositoryService } from './user.repository';

@Component({
  standalone: true,
  template: `
    <div>
      <button (click)="onAddTodo()">Add Todo</button>
      @if(query.isLoading()) {
      <div>Loading...</div>
      } @else if(query.isError()) {
      {{ query.error().message }}
      } @else if (query.isSuccess()){
      <ul>
        @for (user of query.data(); track $index) {
        <li>{{ user.name }}</li>
        }
      </ul>
      }
    </div>
  `,
  selector: 'app-users-repo',
})
export class UsersDataFromRepoComponent {
  userService = inject(UserRepositoryService);
  queryClient = injectQueryClient();

  query = injectQuery(() => ({
    queryKey: [USERS_QUERY_KEY],
    queryFn: () => this.userService.getUsers(),
  }));

  mutation = injectMutation((client) => ({
    mutationFn: (user: User) => this.userService.getUser(user),
    onSuccess: () => {
      // Invalidate and refetch by using the client directly
      client.invalidateQueries({ queryKey: [USERS_QUERY_KEY] });

      // OR use the queryClient that is injected into the component
      // this.queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  }));

  onAddTodo() {
    this.mutation.mutate({
      name: 'Bogdan',
    });
  }
}
