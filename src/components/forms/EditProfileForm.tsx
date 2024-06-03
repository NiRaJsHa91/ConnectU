import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EditProfileValidation } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/AuthContext";
import ProfilePhotoUploader from "../shared/ProfilePhotoUploader";
import { useUpdateProfileMutation } from "@/lib/react-query/queriesAndMutations";
import { toast } from "../ui/use-toast";

const EditProfileForm = () => {
  const { user, setUser } = useUserContext();
  const { mutateAsync: updateProfile, isPending: isUpdatingUser } = useUpdateProfileMutation();
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof EditProfileValidation>>({
    resolver: zodResolver(EditProfileValidation),
    defaultValues: {
      name: user.name,
      file: [],
      username: user.username,
      email: user.email,
    },
  });

  async function onSubmit(values: z.infer<typeof EditProfileValidation>) {
    const userDetails = {
      ...values,
      userID: user.id,
      imageURL: user.imageURL,
      imageID: user.imageID,
    }
    const updatedUser = await updateProfile(userDetails);

    if(!updatedUser) {
      toast({ title: "Profile Update Failed, Please try again" });
    }

    setUser({
          id: updatedUser?.$id || "",
          name: updatedUser?.name,
          username: updatedUser?.username,
          email: updatedUser?.email,
          imageURL: updatedUser?.imageURL,
          bio: updatedUser?.bio,
          imageID: updatedUser?.imageID,
        })
    navigate(`/profile/${user.id}`);
    return toast({ title: "Profile Updated Successfully" });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full h-20 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProfilePhotoUploader
                  fieldChange={field.onChange}
                  imageURL={user.imageURL}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:w-2/3 sm:ml-10">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="bg-dark-3 " {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="sm:w-2/3 sm:ml-10">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="bg-dark-3" {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="sm:w-2/3 sm:ml-10">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-dark-3" {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-blue-700 ml-auto " disabled={isUpdatingUser}>
          {isUpdatingUser ? "Please Wait..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
