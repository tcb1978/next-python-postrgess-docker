import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Dispatch, FC, JSX, SetStateAction } from 'react';

type CardProps = {
  email: string;
  id: string;
  name: string;
  handleDeleteUser: (id: string) => Promise<void>;
  setIsEditing: Dispatch<SetStateAction<{ editing: boolean; id: string; }>>;
};

const CardComponent: FC<CardProps> = ({
  email,
  id,
  name,
  handleDeleteUser,
  setIsEditing,
}): JSX.Element => {
  return (
    <Card className="basis-4xl grow shrink-0 max-w-[24%] border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{email}</p>
      </CardContent>
      <CardFooter className="relative mt-2">
        <AlertDialog>
          <Button
            className="text-white bg-black py-2 px-3 rounded-full absolute left-1.5 border hover:text-black hover:bg-white"
            onClick={() => setIsEditing({
              editing: true,
              id
            })}
          >
            Edit
          </Button>
          <AlertDialogTrigger
            className="text-white bg-black py-2 px-3 rounded-full absolute right-1.5 border hover:text-black hover:bg-white"
          >
            remove
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteUser(id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;