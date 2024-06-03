const SidebarSkeleton = () => (
  <nav className="leftsidebar">
    <div className="flex flex-col h-full relative gap-11">
      <div className="flex gap-2 items-center">
        {/* Logo Skeleton */}
        <div className="h-10 w-10 bg-dark-4 rounded-full"></div>
        <div className="font-bold text-lg animate-pulse">ConnectU</div>
      </div>

      <div className="flex gap-5">
        {/* Profile Photo Skeleton */}
        <div className="h-10 w-10 bg-dark-4 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-dark-4 rounded"></div>
          <div className="h-3 w-24 bg-dark-4 rounded"></div>
        </div>
      </div>

      <ul className="flex flex-col gap-5">
        {/* Sidebar Links Skeleton */}
        {[...Array(5)].map((_, index) => (
          <li
            key={index}
            className="h-8 rounded-md flex items-center py-2 px-2"
          >
            <div className="h-4 w-4 bg-dark-4 rounded"></div>
            <div className="h-4 w-20 bg-dark-4 rounded ml-2"></div>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-2 w-full">
        {/* Logout Button Skeleton */}
        <button className="flex w-full gap-5 bg-dark-4 py-2 px-4 rounded hover:bg-red-500">
          <div className="h-6 w-6 bg-gray-400 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-400 rounded"></div>
        </button>
      </div>
    </div>
  </nav>
);

export default SidebarSkeleton;
