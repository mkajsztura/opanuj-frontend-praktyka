import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersDataFromRepoComponent } from './users-repo.component';
import { UsersDataFromServiceComponent } from './users-service.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="wrapper">
      <div>
        <h4>Users query in component 1</h4>
        <app-users-repo></app-users-repo>
      </div>
      <div>
        <h4>Users query in component 2</h4>
        <app-users-repo></app-users-repo>
      </div>
      <div>
        <h4>Users query by service 1</h4>
        <app-users-service></app-users-service>
      </div>
      <div>
        <h4>Users query by service 2</h4>
        <app-users-service></app-users-service>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 10px;
    }
  `],
  imports: [RouterOutlet, CommonModule, UsersDataFromRepoComponent, UsersDataFromServiceComponent],
})
export class AppComponent {}
