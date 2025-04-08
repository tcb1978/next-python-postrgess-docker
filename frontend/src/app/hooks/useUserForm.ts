import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { User } from './useUsers';

export type UseUserFormProps = {
  handleCreateNewUser: (newUser: { email: string; name: string }) => Promise<void>;
  handleUpdateUser: (updatedUser: User) => Promise<void>;
  isEditing: {
    editing: boolean;
    id: string;
  };
  setIsEditing: Dispatch<SetStateAction<{ editing: boolean; id: string }>>;
};

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const useUserForm = ({
  handleCreateNewUser,
  handleUpdateUser,
  isEditing,
  setIsEditing,
}: UseUserFormProps) => {
  const { editing, id } = isEditing;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (editing) {
      await handleUpdateUser({ id, ...values });
    } else {
      await handleCreateNewUser(values);
    }

    form.reset();

    setIsEditing({
      editing: false,
      id: '',
    });
  };

  return {
    form,
    onSubmit,
  };
};

export default useUserForm;