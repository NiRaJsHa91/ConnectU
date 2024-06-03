import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePostMutation, useGetPostByID } from "@/lib/react-query/queriesAndMutations";
import { formatDateString } from "@/lib/utils";
import {Link, useNavigate, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const PostDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { data: post, isPending: isLoadingPost } = useGetPostByID(id || "")
  const {mutate: deletePost, isSuccess: isPostDeleted, isError: isErrorDeletingPost} = useDeletePostMutation()
  const {user, isLoading: isUserLoading} = useUserContext()

 useEffect(() => {
   if (isErrorDeletingPost) {
      toast({
       title: "Oops!",
       description: "Something went wrong, please try again.",
       variant: "destructive",
     });
   }else if(isPostDeleted){
    navigate('/')
     toast({
       title: "Succesfully deleted post 👍 ",
     });
   }
 }, [isPostDeleted, isErrorDeletingPost]);

  const handleDeletePost = async (e: React.MouseEvent) => {
    e.stopPropagation()
    deletePost({postID: post?.$id || '', imageID: post?.imageID || ''})
  }

  return (
    <div className="flex flex-1 flex-col overflow-scroll custom-scrollbar py-9 px-5 items-center md:py-14">
      {isLoadingPost || isUserLoading ? (
        <div className="content-center w-full h-full">
          <Loader />
        </div>
      ) : (
        <div className="flex min-w-[320px] w-[80%] flex-1 flex-col lg:flex-row lg:justify-between gap-12 items-center max-w-5xl">
          <PhotoProvider>
            <PhotoView src={post?.imageURL}>
              <img
                className="rounded-2xl h-64 w-64 sm:h-80 sm:min-w-80 object-cover cursor-pointer"
                src={post?.imageURL}
                alt="post image"
                title="view"
              />
            </PhotoView>
          </PhotoProvider>
          <div className="w-full">
            <div className="w-full flex flex-row justify-between gap-3 items-center mb-5">
              <div className="flex gap-3 items-center justify-center">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={post?.creator.imageURL || "/assets/icons/avatar.svg"}
                  alt="creator image"
                />
                <div className="flex flex-col gap-1">
                  <p className="base-medium lg:body-bold">
                    {post?.creator.name}
                    <span className="text-sm text-light-4">
                      {" "}
                      {user.id === post?.creator.$id && "(you)"}
                    </span>
                  </p>
                  <span className="subtle-semibold text-light-3">
                    {formatDateString(post?.$createdAt || "")} .{" "}
                    {post?.location}
                  </span>
                </div>
              </div>
              {user.id === post?.creator.$id && (
                <div className="flex gap-5 items-center justify-center">
                  <Link to={`/edit-post/${post?.$id}`}>
                    <img
                      height={20}
                      width={20}
                      src="/assets/icons/edit.png"
                      alt="edit"
                      className="cursor-pointer"
                    />
                  </Link>

                  <img
                    height={20}
                    width={20}
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    className="cursor-pointer"
                    onClick={handleDeletePost}
                  />
                </div>
              )}
            </div>

            <div className=" flex flex-col w-full gap-3 border-t border-t-dark-4">
              <p className="pt-5 small-regular">{post?.caption}</p>
              <p className="text-light-3 text-sm">
                {post?.tags.map((tag: string) => `#${tag} `)}
              </p>
              <PostStats post={post} userID={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default PostDetails
