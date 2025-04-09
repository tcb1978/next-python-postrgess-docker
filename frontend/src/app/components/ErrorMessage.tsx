import type { FC } from 'react';

type ErrorMessageProps = {
  error: string | null;
};

const ErrorMessage: FC<ErrorMessageProps> = ({
  error,
}) => {
  return (
    <div className="text-red-500 animate-pulse">
      <p>{error}</p>
      <button onClick={() => window.location.reload()} className="underline">
        Retry
      </button>
    </div>
  );
};

export default ErrorMessage;