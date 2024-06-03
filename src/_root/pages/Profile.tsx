import GridPostsList from "@/components/shared/GridPostsList";
import { Button } from "@/components/ui/button"
import { useUserContext } from "@/context/AuthContext"
import { useGetUserByID } from "@/lib/react-query/queriesAndMutations";
import { Link, useParams } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import Loader from "@/components/shared/Loader";

const Profile = () => {

  const {id} = useParams()
  const { data: profileUser, isLoading: isProfileUserLoading } = useGetUserByID(id || "")
  const { user } = useUserContext()

  if(isProfileUserLoading)
   return (
    <div className="w-full content-center">
      <Loader height={50} width={50}/>
    </div>
   )


  return (
    <div className="profile-container">
      <div
        className={`flex gap-2 w-full justify-between ${
          user.id === profileUser?.$id && "xs:justify-around"
        }  md:justify-start items-start max-w-5xl`}
      >
        <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:gap-10">
          <PhotoProvider>
            <PhotoView src={profileUser?.imageURL}>
              <img
                className="rounded-full h-20 w-20 sm:h-28 sm:w-28 xl:h-36 xl:w-36 object-cover cursor-pointer"
                src={profileUser?.imageURL}
                alt="profile image"
              />
            </PhotoView>
          </PhotoProvider>
          <div className="profile-details flex flex-col justify-center h-full gap-1">
            <h1 className="font-medium lg:text-3xl xl:text-4xl text-xl ">
              {profileUser?.name}
            </h1>
            <p className="text-light-4 text-sm lg:text-lg">
              {profileUser?.email}
            </p>
            <p className="text-light-4">@{profileUser?.username}</p>
          </div>
        </div>
        {/* <EditProfile /> */}
        {user.id === profileUser?.$id && (
          <Link
            to={`/update-profile/${profileUser?.$id}`}
            className="h-full content-end sm:content-center md:ml-auto xl:ml-20"
          >
            <Button className="bg-dark-4 py-1 px-2">
              <img
                src="/assets/icons/edit-profile.png"
                alt="edit"
                className="h-5 w-5 mr-1"
              />
              <p className="text-light-2 text-xs sm:text-sm hidden sm:block">
                Edit Profile
              </p>
            </Button>
          </Link>
        )}
      </div>
      {profileUser?.posts.length !== 0 && user.id === profileUser?.$id && (
        <div className="flex justify-center gap-2 items-center w-full">
          <h2 className="text-left text-lg font-semibold sm:h3-bold md:h2-bold">
            Your Posts
          </h2>
          <img src="/assets/icons/camera.svg" alt="" className="h-12 w-12" />
        </div>
      )}
      <div className="border-t border-t-dark-4 pt-10 w-full">
        {profileUser?.posts.length === 0 ? (
          user.id === profileUser?.$id ? (
            <div className="flex justify-center items-center flex-col gap-10">
              <img
                src="/assets/icons/camera.svg"
                className="h-20 w-20"
                alt=""
              />
              <h1 className="h3-bold lg:h1-bold text-light-2">Add Posts</h1>
              <p className="text-light-2 text-sm sm:text-lg text-center">
                When you share photos, they will appear on your profile.
              </p>
              <Link to={`/create-post`}>
                <h3 className="text-lg font-semibold text-blue-700">
                  Share your first photo
                </h3>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col gap-10">
              <img
                src="/assets/icons/camera.svg"
                className="h-20 w-20"
                alt=""
              />
              <h1 className="h3-bold lg:h1-bold text-light-2">No posts yet</h1>
            </div>
          )
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mx-auto">
            <GridPostsList
              posts={profileUser?.posts}
              showStats={false}
              showUser={false}
            />
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile

