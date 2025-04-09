'use client';

import type { FC, JSX } from 'react';
import { lazy, memo, Suspense } from 'react';
import { languageApiUrl, usersApiUrl } from '../constants';
import useLanguageDictionary from '../hooks/useLanguageDictionary';
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
  } = useUsers(usersApiUrl);
  const {
    noUsersFound,
    dictionaryLoading,
    dictionaryError,
  } = useLanguageDictionary(languageApiUrl);

  const showSuccess = useSuccessMessage(success);

  const isLoading = loading || dictionaryLoading;
  const isError = error || dictionaryError;

  if (isLoading) {
    return <LoadingMessage />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <>
      <h1>{backendName}</h1>
      {success && <SuccessMessage showSuccess={showSuccess} success={success} />}
      <div className="flex flex-col lg:flex-row gap-4" suppressHydrationWarning>
        <MemoizedCreateUser
          handleCreateNewUser={handleCreateUser}
          handleUpdateUser={handleUpdateUser}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        {users.length > 0 && (
          <>
            <Suspense fallback={<LoadingMessage />}>
              <Users
                users={users}
                setIsEditing={setIsEditing}
                handleDeleteUser={handleDeleteUser}
              />
              <UsersCodeBlock users={users} />
            </Suspense>
          </>
        )}
      </div>
      {users.length === 0 && <p>{noUsersFound}</p>}
    </>
  );
};

export default UserInterface;