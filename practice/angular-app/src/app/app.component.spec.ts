import {render, screen, fireEvent} from '@testing-library/angular'
import { AppComponent, BOOKS } from './app.component';

describe('AppComponent', () => {
  it('should render list of books', async () => {
    await render(AppComponent);
    BOOKS.forEach(book => {
      expect(screen.getByText(book)).toBeTruthy();
    });
    expect(screen.queryAllByText('Delete book').length).toBe(BOOKS.length);
  });

  it('should add a book', async () => {
    await render(AppComponent);
    const newBook = 'New Book';
    fireEvent.input(screen.getByPlaceholderText('New book name'), {target: {value: newBook}});
    fireEvent.click(screen.getByText('Add book'));
    expect(screen.getByText(newBook)).toBeTruthy();
  });

  it('should delete a book', async () => {
    await render(AppComponent);
    const bookToDelete = BOOKS[0];
    fireEvent.click(screen.getAllByText('Delete book')[0]);
    expect(screen.queryByText(bookToDelete)).toBeFalsy();
  });
});
