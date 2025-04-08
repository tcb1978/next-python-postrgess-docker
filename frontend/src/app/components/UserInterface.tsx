'use client';

import type { FC, JSX } from 'react';
import { lazy, Suspense } from 'react';
import { apiUrl } from '../constants';
import useSuccessMessage from '../hooks/useSuccessMessage';
import useUsers from '../hooks/useUsers';
import CreateUser from './CreateUser';
import ErrorMessage from './ErrorMessage';
import LoadingMessage from './LoadingMessage';
import SuccessMessage from './SuccessMessage';

// Lazy load components
const Users = lazy(() => import('./Users'));
const UsersCodeBlock = lazy(() => import('./UsersCodeBlock'));

type UserInterfaceProps = {
  backendName: string;
};

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
      {loading && <LoadingMessage />}
      {error && <ErrorMessage error={error} />}
      {(users.length > 0 && success) && <SuccessMessage showSuccess={showSuccess} success={success} />}
      <div className="flex flex-col lg:flex-row gap-4" suppressHydrationWarning>
        <CreateUser
          handleCreateNewUser={handleCreateUser}
          handleUpdateUser={handleUpdateUser}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        {users.length > 0 && (
          <Suspense fallback={<LoadingMessage />}>
            <Users
              users={users}
              handleDeleteUser={handleDeleteUser}
              setIsEditing={setIsEditing}
            />
            <UsersCodeBlock users={users} />
          </Suspense>
        )}
      </div>
      {users.length === 0 && <p>No users found. Add a new user to get started.</p>}
    </>
  );
};

export default UserInterface;