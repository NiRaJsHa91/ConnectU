import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import Topbar from "@/components/shared/Topbar"
import SidebarSkeleton from "@/components/shared/skeletons/SidebarSkeleton"
import { useUserContext } from "@/context/AuthContext"
import { Outlet } from "react-router-dom"

const RootLayout = () => {

  const {isLoading: isUserLoading} = useUserContext()

  return (
    <div className="w-full md:flex">
      <Topbar />
      {isUserLoading ? <SidebarSkeleton /> : <LeftSidebar />}

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
}

export default RootLayout
