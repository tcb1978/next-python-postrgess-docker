import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Dispatch, FC, SetStateAction } from 'react';
import useInputFocus from '../hooks/useInputFocus';
import useUserForm from '../hooks/useUserForm';
import type { User } from '../hooks/useUsers';

export type CreateUserProps = {
  handleCreateNewUser: (newUser: { email: string; name: string; }) => Promise<void>;
  handleUpdateUser: (updatedUser: User) => Promise<void>;
  isEditing: {
    editing: boolean;
    id: string;
  };
  setIsEditing: Dispatch<SetStateAction<{
    editing: boolean;
    id: string;
  }>>;
};

const CreateUser: FC<CreateUserProps> = ({
  handleCreateNewUser,
  handleUpdateUser,
  isEditing,
  setIsEditing,
}) => {
  const { editing } = isEditing;

  const nameInputRef = useInputFocus(editing);

  const { form, onSubmit } = useUserForm({
    handleCreateNewUser,
    handleUpdateUser,
    isEditing,
    setIsEditing,
  });

  return (
    <section className={`flex flex-col gap-4 p-4 rounded-lg border w-full`}>
      <h2 className="text-lg font-semibold">{editing ? 'Edit ' : 'Create '}User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  {/* Attach the ref to the Input component */}
                  <Input placeholder="name" {...field} ref={nameInputRef} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateUser;