import { useUserContext } from "@/context/AuthContext";
import { formatDateString } from "@/lib/utils";
import { Models } from "appwrite"
import { Link } from "react-router-dom";
import PostStats from "./PostStats";
import { useState } from "react";
import { Blurhash } from "react-blurhash";

type PostCardProps = {
    post: Models.Document    
}

const PostCard = ({post}: PostCardProps) => {

const {user} = useUserContext()
const [imgIsLoading, setImgIsLoading] = useState(true);

const onImageLoad = () => setImgIsLoading(false);

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex flex-col items-center w-full">
          <Link
            to={`/post-details/${post.$id}`}
            className="overflow-hidden h-64 object-contain xs:h-[300px] lg:h-[380px] mb-5"
          >
            {imgIsLoading && post.imageHashURL && (
              <Blurhash
                hash={post.imageHashURL}
                punch={1.5}
                height={380}
                width={"100%"}
                resolutionX={32}
                resolutionY={32}
              />
            )}
            <img
              className=" h-64 w-full object-contain xs:h-[300px] lg:h-[380px] mb-5"
              src={post.imageURL}
              alt="post image"
              loading="lazy"
              onLoad={onImageLoad}
            />
          </Link>
          <div className="w-full flex justify-between gap-3 items-center mb-3">
            <Link className=" " to={`/profile/${post.creator.$id}`}>
              <div className="flex gap-3 items-center justify-center">
                <img
                  className="rounded-full h-10 w-10 object-cover"
                  src={post.creator.imageURL || "/assets/icons/avatar.svg"}
                  alt="creator image"
                />
                <div className="flex flex-col gap-1">
                  <p className="base-medium lg:body-bold line-clamp-1">
                    {post.creator.name}
                    <span className="text-sm text-light-4">
                      {" "}
                      {user.id === post?.creator.$id && "(you)"}
                    </span>
                  </p>
                  <span className="subtle-semibold text-light-3">
                    {formatDateString(post.$createdAt)} . {post.location}
                  </span>
                </div>
              </div>
            </Link>
            {user.id === post.creator.$id && (
              <Link to={`edit-post/${post.$id}`}>
                <img
                  height={20}
                  width={20}
                  src="/assets/icons/edit.png"
                  alt=""
                />
              </Link>
            )}
          </div>

          <Link
            className=" flex flex-col w-full gap-2 border-t border-t-dark-4"
            to={`/post-details/${post.$id}`}
          >
            <p className="pt-1 small-regular">{post.caption}</p>
            <p className="text-light-3 text-sm">
              {post.tags.map((tag: string) => `#${tag} `)}
            </p>
          </Link>
          <div className="w-full">
            <PostStats post={post} userID={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard
