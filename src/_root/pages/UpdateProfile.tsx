import EditProfileForm from "@/components/forms/EditProfileForm";

const UpdateProfile = () => {
  return <div className="common-container mb-5">
    <div className="flex w-full gap-2 items-center max-w-5xl">
      <img src="/assets/icons/edit-white.png" alt="" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12"/>
      <h2 className="w-full text-left font-medium sm:h3-bold md:h2-bold">Edit Profile</h2>
    </div>
    <EditProfileForm/>
  </div>;
}

export default UpdateProfile
