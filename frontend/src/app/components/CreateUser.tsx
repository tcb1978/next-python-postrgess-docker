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
import { zodResolver } from '@hookform/resolvers/zod';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { User } from '../hooks/useUsers';

type CreateUserProps = {
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

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateUser: FC<CreateUserProps> = ({
  handleCreateNewUser,
  handleUpdateUser,
  isEditing,
  setIsEditing,
}) => {
  const { editing, id } = isEditing;

  // Create a ref for the name input field
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // Focus the name input field when editing is true
  useEffect(() => {
    if (editing && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [editing]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    editing
      ? handleUpdateUser({
        id,
        ...values,
      })
      : handleCreateNewUser(values);

    form.reset();

    setIsEditing({
      editing: false,
      id: '',
    });
  };

  return (
    <section className={`flex flex-col gap-4 p-4 rounded-lg`}>
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