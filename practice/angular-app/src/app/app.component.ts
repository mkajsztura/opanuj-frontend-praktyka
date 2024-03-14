import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersComponent } from './users.component';
import { Users2Component } from './users2.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="wrapper">
      <div class="column">
        <h4>Users query in component 1</h4>
        <app-users></app-users>
      </div>
      <div class="column">
        <h4>Users query in component 2</h4>
        <app-users></app-users>
      </div>
      <div class="column">
        <h4>Users query by service 1</h4>
        <app-users2></app-users2>
      </div>
      <div class="column">
        <h4>Users query by service 2</h4>
        <app-users2></app-users2>
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
  imports: [RouterOutlet, CommonModule, UsersComponent, Users2Component],
})
export class AppComponent {}
