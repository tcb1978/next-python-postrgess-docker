'use client';

import type { FC, JSX } from 'react';
import { useEffect, useState } from 'react';
import CardComponent from './Card';

export type User = {
  email: string,
  id: string,
  name: string;
};

type UserInterfaceProps = {
  backendName: string,
};

const UserInterface: FC<UserInterfaceProps> = ({
  backendName,
}): JSX.Element => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/flask/users';
  const [users, setUsers] = useState<User[]>([]);
  console.log('users', users);
  const [newUser, setNew] = useState<{ email: string, name: string; }>({
    email: '',
    name: '',
  });
  const [updateUser, setUpdateUser] = useState<User>({
    email: '',
    id: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${apiUrl}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setSuccess('Users fetched successfully');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create a new user
  const createUser = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      setSuccess('User created successfully');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  // Update an existing user
  const updateUserData = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${apiUrl}/users/${updateUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === data.id ? data : user))
      );
      setSuccess('User updated successfully');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  // Delete a user
  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setSuccess('User deleted successfully');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const backgroundColors: { [key: string]: string; } = {
    flask: 'bg-blue-500',
  };

  const btnColors: { [key: string]: string; } = {
    flask: 'bg-blue-700 hover:bg-blue-600',
  };

  const bgColor = backgroundColors[backendName as keyof typeof backgroundColors] || 'bg-gray-200';
  const btnColor = btnColors[backendName as keyof typeof btnColors] || 'bg-gray-500 hover:bg-gray-600';

  return (
    <div>
      <h1>{backendName}</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <div className={`flex flex-col gap-4 ${bgColor} p-4 rounded-lg`}>
        <h2 className="text-lg font-semibold">Users</h2>
        <div className="flex flex-col gap-2">
          {users.map((user) => (
            <CardComponent
              key={user.id}
              email={user.email}
              id={user.id}
              name={user.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInterface;