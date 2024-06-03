import { useUserContext } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import PostStats from "./shared/PostStats";

type SavedPostsGrid = {
  post: any;
  showUser?: boolean;
  showStats?: boolean;
};

const SavedPostsGrid = ({
  post,
  showUser = true,
  showStats = true,
}: SavedPostsGrid) => {
  const { user } = useUserContext();

  return (
    
          <div key={post?.$id} className="relative rounded-2xl h-60 xl:h-72 overflow-hidden">
            <Link to={`/post-details/${post.$id}`}>
              <img
                src={post?.imageURL}
                alt="post image"
                className="object-cover rounded-2xl w-full h-full"
              />
            </Link>

            <div className="w-full p-2 absolute bottom-0 bg-gradient-to-t from-dark-3 to-transparent flex-between">
              {showUser && (
                <div className="flex items-center gap-2 mr-7">
                  <img
                    src={post.creator.imageURL}
                    alt=""
                    height={30}
                    width={30}
                    className="rounded-full h-8 w-8 object-cover"
                  />
                  <p className="font-semibold line-clamp-1">
                    {post.creator.name}
                  </p>
                </div>
              )}
              {showStats && (
                <div>
                  <PostStats post={post} userID={user.id} />
                </div>
              )}
            </div>
          </div>
        
      
   
  );
};

export default SavedPostsGrid;
