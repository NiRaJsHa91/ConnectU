import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
//   AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutAlert({display}: {display: "small" | "medium"}) {

     const navigate = useNavigate();
    const { mutate: signOutAccount, isSuccess: isLogoutSuccess } =
      useSignOutAccountMutation();

       useEffect(() => {
         if (isLogoutSuccess) navigate(0);
       }, [isLogoutSuccess]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {display === "medium" ? (
          <Button className="flex hover:bg-red gap-5">
            <img
              src="/assets/icons/sign-out.svg"
              alt="Log out"
              title="Logout"
              height={20}
              width={20}
            />
            <span>Log out</span>
          </Button>
        ) : (
          <Button>
            <img
              src="/assets/icons/sign-out.svg"
              alt="Log out"
              title="Logout"
              height={20}
              width={20}
            />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-dark-4 border-none w-2/3 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure, you want to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => signOutAccount()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
