import UserCard from "@/components/shared/UserCard";
import { useGetInfiniteUsers } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {

  const { ref, inView } = useInView();
  const { data: allUsers, hasNextPage, fetchNextPage } = useGetInfiniteUsers();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  return (
    <div className="common-container">
      <div className="user-container">
        <div className="flex gap-3 items-center justify-start">
          <img src="/assets/icons/people.svg" alt="people" className=" h-8 w-8 md:h-10 md:w-10" />
          <h2 className="h3-bold md:h2-bold">All Users</h2>
        </div>
        <ul className="user-grid">
          {allUsers?.pages?.map((page, index) => (
            <UserCard  key={`page-${index}`} userDocuments = {page?.documents || []} />
          ))}
        </ul>
      </div>
      {hasNextPage && (
        <div ref={ref} className="w-full mt-10 text-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default AllUsers;
