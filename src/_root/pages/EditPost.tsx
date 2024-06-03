import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PostForm from "@/components/forms/PostForm";
import { useParams } from "react-router-dom";
import { useGetPostByID } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/shared/Loader";


const EditPost = () => {

  const { id } = useParams()

  const { data: post, isPending: isPostLoading } = useGetPostByID(id || "") 

  if(isPostLoading) return (
    <div className="w-full h-svh flex justify-center items-center">
      <Loader />
    </div>
  );

  // console.log(post)

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex w-full gap-2 items-center max-w-5xl">
          <AddPhotoAlternateOutlinedIcon className="" />
          <h1 className="h3-bold md:h2-bold"> Edit Post</h1>
        </div>

        <PostForm action="update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
