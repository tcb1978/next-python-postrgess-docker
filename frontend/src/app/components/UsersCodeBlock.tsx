import type { FC, JSX } from 'react';
import { User } from '../hooks/useUsers';

type UsersCodeBlockProps = {
  users: User[];
};

const UsersCodeBlock: FC<UsersCodeBlockProps> = ({
  users,
}): JSX.Element => {
  return (
    <section className="p-4 rounded-lg shadow-md border">
      <h2 className="text-lg font-semibold mb-2">Users JSON</h2>
      <pre className="text-white p-4 rounded-lg overflow-auto">
        <code>{JSON.stringify(users, null, 2)}</code>
      </pre>
    </section>
  );
};

export default UsersCodeBlock;