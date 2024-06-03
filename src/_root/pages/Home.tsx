
import PostCard from "@/components/shared/PostCard";
import PostCardSkeleton from "@/components/shared/skeletons/PostCardSkeleton";
import {  useGetRecentPostsQuery } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {

  const { data: posts, isPending: isPostsLoading } = useGetRecentPostsQuery()
  
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="w-full text-left h3-bold md:h2-bold">Home Feed</h2>
          {isPostsLoading || !posts ? (
            Array.from({ length: 6 }).map((_,index) => <PostCardSkeleton key={index}/>)
          ) : (
            <ul className="flex flex-1 flex-col gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => {
                return <PostCard key={post.$id} post={post} />;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home
