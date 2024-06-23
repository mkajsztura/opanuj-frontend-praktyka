import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export const BOOKS = [
  'Harry Potter',
  'The Hobbit',
  'The Lord of the Rings',
  'The Chronicles of Narnia',
  'The Hunger Games',
  'The Maze Runner',
  'The Giver',
  'The Fault in Our Stars',
  'The Perks of Being a Wallflower',
  'The Book Thief',
  'The Lightning Thief',
  'The Alchemist',
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  books = signal(BOOKS);
  inputValue = '';

  addBook() {
    if (this.inputValue === '') {
      return;
    }

    this.books.update((books) => [...books, this.inputValue]);
  }

  deleteBook(bookToRemove: string) {
    this.books.update((books) => books.filter((book) => book !== bookToRemove));
  }
}
