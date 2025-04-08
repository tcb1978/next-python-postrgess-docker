import type { FC, JSX } from 'react';
import type { User } from './UserInterface';

type CardProps = User;

const Card: FC<CardProps> = ({
  email,
  id,
  name
}): JSX.Element => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-2 hover:bg-gray-50">
      <p className="text-sm text-gray-600">Id: {id}</p>
      <p className="text-lg font-semibold text-gray-800">{name}</p>
      <p className="text-sm text-gray-600">Email: {email}</p>
    </div>
  );
};

export default Card;