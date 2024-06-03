import SavedPostsGrid from "@/components/SavedPostsGrid";
import SavedPostsSkeleton from "@/components/shared/skeletons/SavedPostsSkeleton";
import { useUserContext } from "@/context/AuthContext";
import { useGetSavedPostsDetails } from "@/lib/react-query/queriesAndMutations";

const Saved = () => {

  const {user} = useUserContext()
 const { data: savedPostsDetails, isPending: isSavedPostsLoading, isRefetching: isRefetchingSavedPosts } = useGetSavedPostsDetails(user.id);

 
  return (
    <div className="flex items-center py-8 lg:py-10 px-4 md:py-14 flex-1 flex-col custom-scrollbar overflow-scroll">
      <div className="flex w-full gap-1  items-center ">
        <img
          src="/assets/icons/save-white.png"
          alt="save"
          className="h-8 sm:h-10 lg:h-12"
        />
        <h2 className="h3-bold lg:h2-bold">Saved Posts</h2>
      </div>
      <div
        className={`h-full w-full max-w-5xl px-6 py-10 justify-center ${
          savedPostsDetails?.documents?.length === 0
            ? "flex justify-center"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 mx-auto"
        }  `}
      >
        {isSavedPostsLoading || isRefetchingSavedPosts ? (
          <SavedPostsSkeleton />
        ) : savedPostsDetails?.documents?.length === 0 ? (
          <div className="text-light-4 content-center text-lg">
            No Saved Posts
          </div>
        ) : (
          savedPostsDetails?.documents?.map((savedDocument) => {
            
            return (
              <SavedPostsGrid
                key={savedDocument?.post?.$id}
                post={savedDocument?.post}
                showUser={false}
              />
            );
          }   
        )
        )}
      </div>
    </div>
  );
}

export default Saved
