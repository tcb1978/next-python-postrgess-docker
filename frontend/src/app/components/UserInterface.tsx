'use client';

import type { FC, JSX } from 'react';
import { memo } from 'react';
import { apiUrl } from '../constants';
import useSuccessMessage from '../hooks/useSuccessMessage';
import useUsers from '../hooks/useUsers';
import CreateUser from './CreateUser';
import Users from './Users';

type UserInterfaceProps = {
  backendName: string;
};

const MemoizedCreateUser = memo(CreateUser);
const MemoizedUsers = memo(Users);

const UserInterface: FC<UserInterfaceProps> = ({ backendName }): JSX.Element => {
  const {
    users,
    loading,
    error,
    success,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    isEditing,
    setIsEditing,
  } = useUsers(apiUrl);

  const showSuccess = useSuccessMessage(success);

  return (
    <>
      <h1>{backendName}</h1>
      {loading && <p className="animate-pulse">Loading...</p>}
      {error && (
        <div className="text-red-500 animate-pulse">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="underline">
            Retry
          </button>
        </div>
      )}
      <MemoizedCreateUser
        handleCreateNewUser={handleCreateUser}
        handleUpdateUser={handleUpdateUser}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {success && (
        <p className={`text-green-500 transition-opacity duration-500 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
          {success}
        </p>
      )}
      <Users
        handleDeleteUser={handleDeleteUser}
        users={users}
        setIsEditing={setIsEditing}
      />
      {users.length === 0 && <p>No users found. Add a new user to get started.</p>}
    </>
  );
};

export default UserInterface;