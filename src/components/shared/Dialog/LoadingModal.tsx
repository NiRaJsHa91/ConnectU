import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Loader from "../Loader";
import { useEffect } from "react";

type LoadingModalProps = {
  action: string;
  isCreatingPost: boolean;
  isUpdatingPost: boolean;
};

export default function LoadingModal({
  action,
  isCreatingPost,
  isUpdatingPost,
}: LoadingModalProps) {
  const handleKeyDown = (event: any): void => {
    if (
      event.key === "Escape" ||
      event.key === " " ||
      event.key === "Enter" ||
      event.key === "Tab"
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className="bg-blue-700">
          {action === "create" ? "Create Post" : "Update Post"}
        </Button>
      </AlertDialogTrigger>
      {(isCreatingPost || isUpdatingPost) && (
        <AlertDialogContent className="bg-dark-4 border-none w-2/3 rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {action === "create" ? "Creating Post" : "Updating Post"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please hold on while we{" "}
              {action === "create" ? "create" : "update"} your post...
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center justify-center h-20">
            <Loader height={50} width={50} />
          </div>
        </AlertDialogContent>
      )}
    </AlertDialog>
  );
}
