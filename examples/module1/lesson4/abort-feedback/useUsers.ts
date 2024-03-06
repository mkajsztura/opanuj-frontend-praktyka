import { useState } from 'react';
import fetchProxy from './fetch-proxy';

const API_URL = '/api/data/users?timeout=3000';

interface User {
  id: number;
  name: string;
}

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isTimeoutError, setIsTimeoutError] = useState<boolean>(false);

  function loadUsers(timeout: number) {
    fetchProxy(API_URL, { timeout })
      .then((res) => res.json())
      .then((res) => res.users)
      .then((users) => {
        setUsers(users);
      })
      .catch(() => {
        setIsTimeoutError(true);
      });
  }

  function resetUsers(timeout: number = 4000) {
    setIsTimeoutError(false);
    loadUsers(timeout);
  }

  return { users, isTimeoutError, resetUsers, loadUsers };
}
