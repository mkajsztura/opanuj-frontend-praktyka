// @vitest-environment jsdom

import { describe, test, expect } from 'vitest';
import { renderItems } from './renderer';

const users: User[] = [
  { id: 1, name: 'John', age: 30, role: 'user' },
  { id: 2, name: 'Jane', age: 25, role: 'admin' },
  { id: 3, name: 'Jack', age: 40, role: 'user' },
];

describe('User renderer', () => {
  test('should render all users if admin is rendering the list', () => {
    localStorage.setItem('userRole', 'admin');

    const container = document.createElement('div');
    renderItems(container, users);
    expect(Array.from(container.querySelectorAll('li'))).toHaveLength(3);
    expect(container.querySelectorAll('li')[0].textContent).toContain('Name: John, Age: 30');
    expect(container.querySelectorAll('li')[0].textContent).not.toContain('(Admin)');
    expect(container.querySelectorAll('li')[1].textContent).toContain('(Admin) Name: Jane, Age: 25');
    expect(container.querySelectorAll('li')[2].textContent).toContain('Name: Jack, Age: 40');
    expect(container.querySelectorAll('li')[2].textContent).not.toContain('(Admin)');

  });

  test('should render only regular users if non-admin is rendering the list', () => {
    localStorage.setItem('userRole', 'user');

    const container = document.createElement('div');
    renderItems(container, users);
    expect(Array.from(container.querySelectorAll('li'))).toHaveLength(2);
    expect(container.querySelectorAll('li')[0].textContent).toContain('Name: John, Age: 30');
    expect(container.querySelectorAll('li')[1].textContent).toContain('Name: Jack, Age: 40');
  });
});
