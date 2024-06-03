import { Models } from "appwrite"
import { Link } from "react-router-dom";

const UserCard = ({userDocuments}: {userDocuments: Models.Document[]}) => {

  return userDocuments?.map((userDetails: Models.Document) => {
    return (
      <Link to={`/profile/${userDetails.$id}`} key={userDetails.$id} className="rounded-[28px] border-[3px] border-dark-3 flex flex-1 flex-col gap-3 items-center justify-center py-6 max-w-xs">
        <img
          src={userDetails?.imageURL}
          alt=""
          className="rounded-full h-24 w-24 object-cover mb-3"
        />
        <p className=" text-xl text-center font-semibold text-slate-100">{userDetails?.name}</p>
        <span className="text-slate-500">@{userDetails?.username}</span>
      </Link>
    );
});
}

export default UserCard
