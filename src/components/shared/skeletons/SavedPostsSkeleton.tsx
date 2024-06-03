
const SavedPostsSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="relative rounded-2xl h-60 xl:h-72 overflow-hidden bg-dark-4 animate-pulse"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-dark-4 animate-pulse rounded-2xl"></div>
          <div className="w-full p-2 absolute bottom-0 bg-gradient-to-t from-dark-3 to-transparent flex-between">
            <div className="flex items-center gap-2 mr-7">
              <div className="bg-light-3 rounded-full h-8 w-8 animate-pulse"></div>
              <div className="bg-light-3 h-4 w-24 animate-pulse rounded"></div>
            </div>

            <div className="bg-light-3 h-4 w-16 animate-pulse rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SavedPostsSkeleton;