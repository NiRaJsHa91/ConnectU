import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { useLocation } from "react-router-dom";
import LogoutAlert from "./Dialog/alerts/LogoutAlert";

const LeftSidebar = () => {
  const { user } = useUserContext();
  const { pathname } = useLocation();

  return (
    <nav className="leftsidebar  ">
      <div className="flex flex-col gap-11 h-full mb-8">
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

        <Link
          className={`flex gap-5 items-center justify-start`}
          title="profile"
          to={`/profile/${user.id}`}
        >
          <img
            className="rounded-full h-16 w-16 object-cover"
            src={`${user.imageURL}` || "/assets/icons/avatar.svg"}
            alt="profile photo"
          />

          <div className="flex flex-col">
            <p className="font-bold line-clamp-1">{user.name}</p>

            <span className="text-sm text-slate-500">@{user.username}</span>
          </div>
        </Link>

        <ul className="flex flex-col gap-5">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`hover:bg-blue-700 h-8 ${
                  isActive && "bg-blue-700 h-10"
                } rounded-md flex items-center py-2 px-2 transition-all duration-400`}
              >
                <NavLink
                  className="flex gap-4 items-center "
                  title={link.label}
                  to={link.route}
                >
                  <img
                    height={20}
                    width={20}
                    src={link.imgUrl}
                    alt={link.label}
                  />
                  <span className="font-bold">{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <LogoutAlert display="medium" />
      </div>
    </nav>
  );
};

export default LeftSidebar;
