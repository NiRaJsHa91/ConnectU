import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PostValidation } from "@/lib/validation";
import { Button } from "@/components/ui/button";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "../shared/FileUploader";
import { Models } from "appwrite";
import { useCreatePostMutation, useUpdatePostMutation } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../shared/Dialog/LoadingModal";


type PostFormProps = {
  post?: Models.Document,
  action: "create" | "update"
}

const PostForm = ({post, action}: PostFormProps) => {

  const navigate = useNavigate()
  const { user } = useUserContext()
  const {mutateAsync: createPost, isPending: isCreatingPost} = useCreatePostMutation()
  const {mutateAsync: updatePost , isPending: isUpdatingPost} = useUpdatePostMutation()
  

  
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post? post.caption : "",
      file: [],
      location: post? post.location : "",
      tags: post? post.tags.join(',') : "",
    },
  });

  
  async function onSubmit(values: z.infer<typeof PostValidation>) {

    if(post && action === "update") {
      const updatedPost = await updatePost({
        ...values,
        postID: post.$id,
        imageID: post.imageID,
        imageURL: post.imageURL
      })

      if(!updatedPost) {
        toast({ title: "Post Update Failed, Please try again" });
    }

     navigate(`/post-details/${post.$id}`)
     return toast({ title: "Post Updated Successfully" });
  }

    const newPost = await createPost({
          ...values,
          userId: user.id,
        })
        console.log(newPost)

        if(!newPost){
          toast({ title: "Post Creation Failed, Please try again" });
          return
        } 
      console.log("redirecting")
      return navigate('/')

}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full h-20 max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea className="bg-dark-3 rounded-xl h-36" {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  imageURL={post && post.imageURL}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Location</FormLabel>
              <FormControl>
                <Input className="bg-dark-3" {...field} />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add tags (seperated by commas ' , ')</FormLabel>
              <FormControl>
                <Input
                  placeholder="JS, React, NEXT"
                  className="bg-dark-3"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red" />
            </FormItem>
          )}
        />

        <div className="flex justify-between m-auto w-full max-w-3xl items-center p-5">
          <Button onClick={() => navigate(-1)} className="bg-red">
            Cancel
          </Button>
          <LoadingModal
            action={action}
            isCreatingPost={isCreatingPost}
            isUpdatingPost={isUpdatingPost}
            
          />
          {/* <Button
            type="submit"
            className="bg-blue-700"
            disabled={isCreatingPost || isUpdatingPost}
          >
            {action === "create" ? "Post" : "Update"}
            {isCreatingPost || (isUpdatingPost && <Loader />)}
          </Button> */}
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
