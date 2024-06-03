
const PostCardSkeleton = () => (
  <div className="post-card animate-pulse">
    <div className="flex-between">
      <div className="flex flex-col items-center w-full">
        {/* Placeholder for image */}
        <div className="w-full h-64 bg-dark-4 rounded-[24px] xs:h-[300px] lg:h-[380px] mb-5"></div>

        {/* Placeholder for user info */}
        <div className="w-full flex justify-between gap-3 items-center mb-3">
          <div className="flex gap-3 items-center justify-center">
            <div className="rounded-full h-8 w-8 bg-dark-4"></div>
            <div className="flex flex-col gap-1 ">
              <div className="base-medium lg:body-bold line-clamp-1 rounded-md h-4 w-28 bg-dark-4"></div>
              <div className="subtle-semibold text-light-3 bg-dark-4 rounded-md h-4 w-24"></div>
            </div>
          </div>
          <div>
            {/* Placeholder for edit icon */}
            <div className="h-6 w-6 bg-dark-4"></div>
          </div>
        </div>

        {/* Placeholder for post content */}
        <div className="flex flex-col w-full gap-2 border-t pt-5 border-t-dark-4">
          <div className=" small-regular bg-dark-4 rounded-md h-3 w-32"></div>
          <div className="text-light-3 text-sm bg-dark-4 rounded-md h-3 w-28"></div>
        </div>

        {/* Placeholder for post stats */}
        <div className="w-full flex-between mt-5">
          <div className="h-5 w-5 bg-dark-4"></div>
          <div className="h-5 w-5 bg-dark-4"></div>
        </div>
      </div>
    </div>
  </div>
);

export default PostCardSkeleton;
