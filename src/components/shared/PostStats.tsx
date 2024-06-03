import { useGetCurrentUser, useLikePost, useSavePost, usedeleteSavedPostRecord } from '@/lib/react-query/queriesAndMutations';
import { Models } from 'appwrite';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

type PostStatsProps = {
    post?: Models.Document,
    userID: string
}

const PostStats = ({post, userID}: PostStatsProps) => {

    const {mutate: likePost} = useLikePost()
    const {mutate: savePost, isPending: isSaving } = useSavePost()
    const { mutate: deleteSavedRecord, isPending: isUnsaving } = usedeleteSavedPostRecord()
    const { data: currentUser } = useGetCurrentUser();

    const likesList = post?.likes.map((user: Models.Document) => { 
        return( 
        user.$id
        )
    });
    
    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false);

    const savedPostRecord = currentUser?.save.find(
      (record: Models.Document) => record.post?.$id === post?.$id
    );

useEffect(() => {
  if (savedPostRecord) {
    setIsSaved(true);
  }
},[currentUser])
    

    const handleLike = ( e: React.MouseEvent ) => {
        e.stopPropagation()
        const newLikesList = [...likes]

        const hasLiked = newLikesList.includes(userID)
        if(hasLiked){
            newLikesList.splice(newLikesList.indexOf(userID), 1)
        }else{
            newLikesList.push(userID)
        }

        setLikes(newLikesList)
        likePost({postID: post?.$id || '', newLikesList: newLikesList})
    }

    const handleSavePost = (
      e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
      e.stopPropagation();

      if (savedPostRecord) {
        setIsSaved(false);
        deleteSavedRecord(savedPostRecord.$id);
      } else {
        savePost({ userID: userID, postID: post?.$id || '' });
        setIsSaved(true);
      }
    }

      

  return (
    <div>
      <div className="flex justify-between gap-2 mt-3">
        <div className="flex gap-1 items-center justify-center">
          <img
            className="cursor-pointer"
            height={22}
            width={22}
            src={ likes.includes(userID) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg" }
            alt=""
            onClick={handleLike}
          />
          <p className='text-sm'>{likes.length}</p>
        </div>
        {
          isSaving || isUnsaving ? <Loader height={50} width={50}/> :
        
        <img
          className="cursor-pointer"
          height={20}
          width={20}
          src={isSaved ? "/assets/icons/bookmark-filled.svg" : "/assets/images/bookmark.png"}
          alt=""
          onClick={handleSavePost}
        />}
      </div>
    </div>
  );
}

export default PostStats
