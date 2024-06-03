import GridPostsList from "@/components/shared/GridPostsList";
import Loader from "@/components/shared/Loader";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input"
import { useGetInfinitePosts } from "@/lib/react-query/queriesAndMutations";
import { useEffect, useState } from "react";
import {useInView} from "react-intersection-observer"


const Explore = () => {

const {ref, inView} = useInView()
const {data: posts, hasNextPage, fetchNextPage} = useGetInfinitePosts()


const [search, setSearch] = useState("")

useEffect(() => {
  if(inView && !search) fetchNextPage()
},[inView,search])

if(!posts){
  return <div className="content-center w-full">
    <Loader height={50} width={50}/>
  </div>
}

const shouldShowSearchResults = search !== "";
const shouldShowPosts = !shouldShowSearchResults && !posts.pages.every((item) => item?.documents.length === 0);


  return (
    <div className="flex flex-1 items-center py-10 px-4 md:py-14 flex-col overflow-scroll custom-scrollbar">
      <div className="max-w-5xl flex flex-col gap-4 w-full">
        <h2 className="h3-bold md:h2-bold">Search Posts</h2>
        <div className="bg-dark-4 flex px-2 rounded-lg gap-2">
          <img
            src="/assets/icons/search.svg"
            height={20}
            width={20}
            alt="search"
          />
          <Input
            placeholder="Search"
            className="bg-dark-4 placeholder:text-light-4 border-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className=" max-w-5xl flex-between w-full mt-10 mb-7">
        <h3 className=" text-[18px] font-bold md:h3-bold">Popular Today</h3>
        <div className="bg-dark-4 flex px-2 py-1 rounded-lg cursor-pointer">
          <p className="text-light-4 font-semibold">All</p>
          <img
            className="ml-2"
            src="/assets/icons/filter.png"
            height={20}
            width={20}
            alt=""
          />
        </div>
      </div>

      <div className="flex gap-9 w-full flex-wrap max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults searchValue={search} />
        ) : shouldShowPosts ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mx-auto">
          {posts.pages.map((item, index) => (
            
              <GridPostsList
                key={`page-${index}`}
                posts={item?.documents || []}
              />
           
          ))}
           </ul>
        ) : (
          <p className="text-light-4 text-center w-full text-sm">
            End of Posts
          </p>
        )}
      </div>
      {hasNextPage && !search && (
        <div ref={ref} className="w-full mt-8">
          <Loader height={24} width={24}/>
        </div>
      )}
    </div>
  );
}

export default Explore
