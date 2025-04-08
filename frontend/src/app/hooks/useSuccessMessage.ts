import { useEffect, useState } from 'react';

const useSuccessMessage = (success: string | null, duration: number = 3000) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      setShowSuccess(true);
      const timeout = setTimeout(() => setShowSuccess(false), duration);
      return () => clearTimeout(timeout); // Cleanup timeout on unmount or success change
    }
  }, [success, duration]);

  return showSuccess;
};

export default useSuccessMessage;