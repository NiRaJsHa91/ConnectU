import useDebounceValue from "@/hooks/useDebounce";
import { useSearchedPosts } from "@/lib/react-query/queriesAndMutations";
import Loader from "./Loader";
import GridPostsList from "./GridPostsList";

const SearchResults = ({searchValue}: {searchValue: string}) => {

const debouncedSearchValue = useDebounceValue(searchValue, 500);
const { data: searchedPosts, isFetching: isSearchFetching } =
  useSearchedPosts(debouncedSearchValue);

 if(isSearchFetching)
  return <div className="w-full">
     <Loader/>
         </div>

 else if(searchedPosts && searchedPosts.documents.length > 0) return (
   <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl mx-auto">
     <GridPostsList posts={searchedPosts.documents} />
   </ul>
 ); 

 else return <p className="text-light-4 text-center w-full text-sm">No Posts Found</p>

}
export default SearchResults
