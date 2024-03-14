import { Component, inject } from '@angular/core';

import { injectQueryClient } from '@tanstack/angular-query-experimental';
import { UserService } from './user.service';

@Component({
  standalone: true,
  template: `
    <div>
      <button (click)="onAddTodo()">Add Todo</button>
      @if(query.isLoading()) {
      <div>Loading...</div>
      }
      <ul>
        @for (user of query.data(); track $index) {
        <li>{{ user.name }}</li>
        }
      </ul>
    </div>
  `,
  selector: 'app-users-service',
})
export class UsersDataFromServiceComponent {
  userService = inject(UserService);
  queryClient = injectQueryClient();

  query = this.userService.userQuery;

  onAddTodo() {
    this.userService.userAddMutation.mutate({
      name: 'Bogdan',
    });
  }
}
