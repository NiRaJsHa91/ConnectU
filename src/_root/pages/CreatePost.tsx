import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import PostForm from '@/components/forms/PostForm';


const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className='flex w-full gap-2 items-center max-w-5xl'>
          <AddPhotoAlternateOutlinedIcon className=''/>
          <h1 className='h3-bold md:h2-bold'> Create Post</h1>
        </div>

        <PostForm action="create"/>

      </div>
    </div>
  );
}

export default CreatePost
