import { useUserContext } from '@/context/AuthContext';
import { Models } from 'appwrite'
import { Link } from 'react-router-dom';
import PostStats from './PostStats';
import { Blurhash } from "react-blurhash";
import { useEffect, useState } from 'react';
import { clearTimeout } from 'timers';

export type GridPostsListProps = {
  posts: Models.Document[],
  showUser?: boolean,
  showStats?: boolean,
}

const GridPostsList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostsListProps) => {

  const {user} = useUserContext()
  const [imgIsLoading, setImgIsLoading] = useState(true);

  const onImageLoad = () => setImgIsLoading(false);

  return (
    
      posts?.map((post) => {
        // console.log(post)
        return (
          <li
            key={post?.$id}
            className="relative rounded-2xl h-80 overflow-hidden"
          >
            <Link to={`/post-details/${post.$id}`}>
              {imgIsLoading && post.imageHashURL && (
                <Blurhash
                  hash={post.imageHashURL}
                  punch={1.5}
                  height={320}
                  width={320}
                  resolutionX={32}
                  resolutionY={32}
                
                />
              )}
              
                <img
                  src={post.imageURL}
                  alt="post image"
                  className="object-cover rounded-2xl w-full  h-full"
                  onLoad={onImageLoad}
                />
              
            </Link>

            <div className="w-full p-2 absolute bottom-0 bg-gradient-to-t from-dark-3 to-transparent flex-between">
              {showUser && (
                <div className="flex items-center gap-2 mr-7">
                  <img
                    src={post.creator.imageURL}
                    alt=""
                    className="rounded-full h-8 w-8 object-cover
                    "
                  />
                  <p className="font-semibold line-clamp-1">
                    {post.creator.name}
                  </p>
                </div>
              )}
              {showStats && (
                <div>
                  <PostStats post={post} userID={user.id} />
                </div>
              )}
            </div>
          </li>
        );
      })
    
  );
};

export default GridPostsList
