import type { Dispatch, FC, SetStateAction } from 'react';
import type { User } from '../hooks/useUsers';
import CardComponent from './CardComponent';

type UsersProps = {
  users: User[];
  setIsEditing: Dispatch<SetStateAction<{
    editing: boolean;
    id: string;
  }>>;
  handleDeleteUser: (id: string) => Promise<void>;
};

const Users: FC<UsersProps> = ({
  users,
  setIsEditing,
  handleDeleteUser,
}) => {

  return (
    <section className={`flex flex-col rounded-lg border w-auto p-2`}>
      <h2 className="text-lg font-semibold">Users</h2>
      <div className="flex flex-wrap justify-between gap-2">
        {users.map((user) => (
          <CardComponent
            key={user.id}
            email={user.email}
            id={user.id}
            name={user.name}
            handleDeleteUser={handleDeleteUser}
            setIsEditing={setIsEditing}
          />
        ))}
      </div>
    </section>
  );
};

export default Users;