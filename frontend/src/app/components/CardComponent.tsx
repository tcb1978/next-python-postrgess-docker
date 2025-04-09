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
import { languageApiUrl } from '../constants';
import useLanguageDictionary from '../hooks/useLanguageDictionary';

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

  const { usersDictionary } = useLanguageDictionary(languageApiUrl);
  const { callToActions, confirmation } = usersDictionary || {};

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
            {callToActions?.edit}
          </Button>
          <AlertDialogTrigger
            className="text-white bg-black py-2 px-3 rounded-full absolute right-1.5 border hover:text-black hover:bg-white"
          >
            {callToActions?.delete}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {confirmation?.alertDialogTitle}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {confirmation?.alertDialogDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {confirmation?.alertDialogCancel}
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteUser(id)}>
                {confirmation?.alertDialogAction}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default CardComponent;