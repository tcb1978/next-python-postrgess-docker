import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';

export type User = {
  email: string;
  id: string;
  name: string;
};

export type UseUsersReturn = {
  users: User[];
  loading: boolean;
  error: string | null;
  success: string | null;
  handleCreateUser: (newUser: { email: string; name: string }) => Promise<void>;
  handleUpdateUser: (updatedUser: User) => Promise<void>;
  handleDeleteUser: (id: string) => Promise<void>;
  isEditing: {
    editing: boolean;
    id: string;
  };
  setIsEditing: Dispatch<SetStateAction<{ editing: boolean; id: string }>>;
};

const useUsers = (apiUrl: string): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState({
    editing: false,
    id: '',
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(apiUrl);
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
  }, [apiUrl, isEditing]);

  const handleCreateUser = useCallback(
    async (newUser: { email: string; name: string }) => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const response = await fetch(apiUrl, {
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
        setSuccess(`User: ${newUser.name}, created successfully`);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  const handleUpdateUser = useCallback(
    async (updatedUser: User) => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const response = await fetch(`${apiUrl}/${updatedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });
        if (!response.ok) {
          throw new Error('Failed to update user');
        }
        const data = await response.json();
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === data.id ? data : user))
        );
        setSuccess(`User: ${updatedUser.name}, updated successfully`);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  const handleDeleteUser = useCallback(
    async (id: string) => {
      if (!id) {
        setError('User ID is required');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      setSuccess(null);

      const userToDeleteName = users.find((user) => user.id === id)?.name;

      try {
        const response = await fetch(`${apiUrl}/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Failed to delete User, ${userToDeleteName}`);
        }
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setSuccess(`User: ${userToDeleteName}, deleted successfully`);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    success,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    isEditing,
    setIsEditing,
  };
};

export default useUsers;