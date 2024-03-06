import { useEffect } from 'react';
import useUsers from './useUsers';

const App = () => {
  const { isTimeoutError, users, resetUsers } = useUsers();

  useEffect(() => {
    resetUsers(2000);
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Users [timeout=3s]</h1>
        {isTimeoutError && (
          <div className="flex flex-row items-center">
            <p className="mr-2">
              Sorry, there seems to be connectivity issues...
            </p>
            <button
              className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4 m-2"
              onClick={() => resetUsers(2000)}
            >
              Try again with 2s timeout
            </button>
            <button
              className="text-blue-400 bg-blue-200 hover:text-blue-200 hover:bg-blue-400 rounded-md p-4 m-2"
              onClick={() => resetUsers(4000)}
            >
              Try again with 4s timeout
            </button>
          </div>
        )}
      </div>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            className="bg-white p-4 rounded-md border border-gray-100"
            key={index}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
