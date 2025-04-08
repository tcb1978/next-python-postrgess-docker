import type { FC } from 'react';

type SuccessMessageProps = {
  showSuccess: boolean;
  success: string;
};

const SuccessMessage: FC<SuccessMessageProps> = ({
  showSuccess,
  success,
}) => {
  return (
    <p className={`text-green-500 transition-opacity duration-500 ${showSuccess ? 'opacity-100' : 'opacity-0'}`}>
      {success}
    </p>
  );
};

export default SuccessMessage;