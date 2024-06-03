import { bottombarLinks } from "@/constants"
import { NavLink, useLocation } from "react-router-dom";

const Bottombar = () => {

  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      
        {bottombarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={` hover:bg-blue-700 h-8 ${
                isActive && "bg-blue-700"
              } rounded-md flex items-center py-2 px-2 transition-all duration-400`}
            >
              <NavLink
                className="flex flex-col items-center "
                title={link.label}
                to={link.route}
              >
                <img
                  height={18}
                  width={18}
                  src={link.imgUrl}
                  alt={link.label}
                />
                <span className="tiny-medium">{link.label}</span>
              </NavLink>
            </li>
          );
        })}
      
    </section>
  );
}

export default Bottombar
