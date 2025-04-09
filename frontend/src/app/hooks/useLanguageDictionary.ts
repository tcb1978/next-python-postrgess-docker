import { useEffect, useState } from 'react';

type LanguageDictionary = {
  createUser: {
    heading: {
      create: string;
      edit: string;
    };
    formElements: {
      name: {
        label: string;
        type: string;
        description: string;
        required: boolean;
      };
      email: {
        label: string;
        type: string;
        description: string;
        required: boolean;
      };
    };
    callToActions: string;
  };
  users: {
    heading: string;
    callToActions: {
      edit: string;
      delete: string;
    };
    confirmation: {
      alertDialogTitle: string;
      alertDialogDescription: string;
      alertDialogCancel: string;
      alertDialogAction: string;
    }
  };
  dataShape: {
    heading: string;
  }
  noUsersFound: string
};

const useLanguageDictionary = (languageApiUrl: string) => {
  const [dictionary, setDictionary] = useState<LanguageDictionary | null>(null);
  const [dictionaryLoading, setDictionaryLoading] = useState<boolean>(true);
  const [dictionaryError, setDictionaryError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      setDictionaryLoading(true);
      setDictionaryError(null);

      try {
        const response = await fetch(`${languageApiUrl}`);
        if (!response.ok) {
          throw new Error('Failed to fetch language dictionary');
        }
        const data = await response.json();
        setDictionary(data[0]);
      } catch (err) {
        setDictionaryError((err as Error).message);
      } finally {
        setDictionaryLoading(false);
      }
    };

    fetchDictionary();
  }, [languageApiUrl]);

  return {
    createUserDictionary: dictionary?.createUser,
    usersDictionary: dictionary?.users,
    dataShape: dictionary?.dataShape,
    noUsersFound: dictionary?.noUsersFound,
    dictionaryLoading,
    dictionaryError
  };
};

export default useLanguageDictionary;