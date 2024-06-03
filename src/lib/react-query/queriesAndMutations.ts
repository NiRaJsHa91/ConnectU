import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { createNewAccount, createPost, deletePost, deleteSavedRecord, doesFollow, follow, getCurrentUser, getInfinitePosts, getInfiniteUsers, getPostByID, getRecentPosts, getSavedPosts, getUserByID, likePost, savePost, searchedPosts, signInAccount, signOutAccount, updatePost, updateProfile } from "../appwrite/api";
import { INewPost, INewUser, IupdatePost, IupdateUser } from "@/types";
import { QueryKeys } from "./queryKeys";

export const useCreateUserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createNewAccount(user)
    })
}

export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => signInAccount(user)
    })
}

export const useSignOutAccountMutation = () => {
    return useMutation({
        mutationFn: signOutAccount
    })
}

export const useCreatePostMutation = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.GET_RECENT_POSTS]
            })
        }
    })
}

export const useGetRecentPostsQuery = () => {
    return useQuery({
        queryKey: [QueryKeys.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
}

export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({postID, newLikesList}:{postID: string, newLikesList: string[]}) => 
        likePost(postID, newLikesList),
        onSuccess: () => queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_RECENT_POSTS]
      })   
    });
}

export const useSavePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({postID, userID}:{postID: string, userID: string}) => savePost(postID, userID),
         onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_SAVED_POSTS_DETAILS],
      });
    }})
      
}

export const usedeleteSavedPostRecord = () => {
        const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (savedPostRecordID: string) =>
        deleteSavedRecord(savedPostRecordID),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_CURRENT_USER],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.GET_SAVED_POSTS_DETAILS],
        });
      },
    });
}

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QueryKeys.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}

export const useGetPostByID = (postID: string) => {
    return useQuery({
        queryKey: [QueryKeys.GET_POST_BY_ID, postID],
        queryFn: () => getPostByID(postID),
        enabled: !!postID
    })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: IupdatePost) => updatePost(post),
    onSuccess: (data) => queryClient.invalidateQueries({
      queryKey: [QueryKeys.GET_POST_BY_ID, data?.$id]
    })
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({postID, imageID}:{postID: string, imageID: string}) => deletePost(postID, imageID),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [QueryKeys.GET_RECENT_POSTS]
    })
  })
}

export const useSearchedPosts = (search: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SEARCHED_POSTS, search],
    queryFn: () => searchedPosts(search),
    enabled: !!search,
  });
}

export const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.GET_INFINITE_USERS],
    queryFn: getInfinitePosts as any,
    getNextPageParam: (lastPage: any) => {
      if(lastPage && lastPage.documents.length === 0) return null
      
      const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id

      return lastId
    },
    initialPageParam: undefined
  })
}

export const useGetInfiniteUsers = () => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.GET_INFINITE_POSTS],
    queryFn: getInfiniteUsers as any,
    getNextPageParam: (lastPage: any) => {
      if (lastPage && lastPage.documents.length === 0) return null;

      const lastId = lastPage?.documents[lastPage?.documents.length - 1].$id;

      return lastId;
    },
    initialPageParam: undefined,
  });
}

export const useGetSavedPostsDetails = (userID: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_SAVED_POSTS_DETAILS, userID],
    queryFn: () => getSavedPosts(userID),
    enabled: !!userID
  })
}

export const useGetUserByID = (userDocumentID: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_USER_BY_ID, userDocumentID],
    queryFn: () => getUserByID(userDocumentID),
    enabled: !!userDocumentID,
  });
}

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: IupdateUser) => updateProfile(user),
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: [QueryKeys.GET_CURRENT_USER]
    })
  })
}

export const useFollowMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      followedByID,
      beingFollowedID,
    }: {
      followedByID: string;
      beingFollowedID: string;
    }) => follow(followedByID, beingFollowedID),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_CURRENT_USER],
      }),
  });
}

// check if user follows another user
export const useDoesFollowQuery = (followedByID: string, beingFollowedID: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_DOES_FOLLOW],
    queryFn: () => doesFollow(followedByID, beingFollowedID),
  });
}




