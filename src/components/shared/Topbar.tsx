import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccountMutation } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import LogoutAlert from "./Dialog/alerts/LogoutAlert";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { isSuccess: isLogoutSuccess } = useSignOutAccountMutation();

  useEffect(() => {
    if (isLogoutSuccess) navigate(0);
  }, [isLogoutSuccess]);

  return (
    <section className="topbar">
      <div className="flex py-3 px-5 items-center justify-between ">
        <Link to="/" className="flex gap-2 items-center">
          <img
            className=""
            height={40}
            width={40}
            src="/assets/images/ConnectU-icon.png"
            alt="logo"
          />
          <span className="font-bold text-lg">ConnectU</span>
        </Link>

        <div className="flex items-center justify-center gap-3">
          <LogoutAlert display="small" />

          <Link title="profile" to={`/profile/${user.id}`}>
            <img
              className="rounded-full object-cover h-8 w-8"
              src={`${user.imageURL}` || "/assets/icons/avatar.svg"}
              alt="profile photo"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
