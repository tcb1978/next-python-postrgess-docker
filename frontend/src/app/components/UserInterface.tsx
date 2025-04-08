'use client';

import type { FC, JSX } from 'react';
import { memo } from 'react';
import { apiUrl } from '../constants';
import useSuccessMessage from '../hooks/useSuccessMessage';
import useUsers from '../hooks/useUsers';
import CreateUser from './CreateUser';
import ErrorMessage from './ErrorMessage';
import LoadingMessage from './LoadingMessage';
import SuccessMessage from './SuccessMessage';
import Users from './Users';
import UsersCodeBlock from './UsersCodeBlock';

type UserInterfaceProps = {
  backendName: string;
};

const MemoizedCreateUser = memo(CreateUser);

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

  console.log('users', users);

  return (
    <>
      <h1>{backendName}</h1>
      {loading && <LoadingMessage />}
      {error && <ErrorMessage error={error} />}
      <MemoizedCreateUser
        handleCreateNewUser={handleCreateUser}
        handleUpdateUser={handleUpdateUser}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {success && <SuccessMessage showSuccess={showSuccess} success={success} />}
      {!!users && (
        <div className="flex flex-row gap-4">
          <Users
            users={users}
            handleDeleteUser={handleDeleteUser}
            setIsEditing={setIsEditing}
          />
          <UsersCodeBlock users={users} />
        </div>
      )}
      {users.length === 0 && <p>No users found. Add a new user to get started.</p>}
    </>
  );
};

export default UserInterface;