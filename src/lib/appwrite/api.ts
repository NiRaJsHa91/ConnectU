import { INewPost, INewUser, IupdatePost, IupdateUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, Models, Query } from "appwrite";
import { encodeImageToBlurhash } from "../react-blurhash/encoder";

export async function createNewAccount(user: INewUser) {
  try {
    const newSignup = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newSignup) throw new Error("Signup Failed");
    const avatarURL = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountID: newSignup.$id,
      username: user.username,
      email: newSignup.email,
      name: newSignup.name,
      imageURL: avatarURL,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountID: string;
  username?: string;
  email: string;
  name: string;
  imageURL: URL;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.usersCollectionID,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentSession() {
  try {
    const currentSession = await account.get();
    return currentSession;
  } catch (error) {
    console.log("error in getCurrentSession" + error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getCurrentSession();

    if (!currentAccount) throw new Error("No Current User");

    // console.log(currentAccount);
    const currentUser = await databases.listDocuments(
      appwriteConfig.DatabaseID,
      appwriteConfig.usersCollectionID,
      [Query.equal("accountID", currentAccount.$id)]
    );
    // console.log(currentUser);

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log("error in getCurrentUser" + error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const deletedSession = await account.deleteSession("current");
    return deletedSession;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  let hash
  try {
    // Upload File to Storage
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw new Error("File Upload Failed, Please try again");

    const fileURL =  getFilePreview(uploadedFile.$id);
    if(fileURL)  hash = await encodeImageToBlurhash(fileURL.toString());

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const newPost = await databases.createDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.postsCollectionID,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        tags: tags,
        imageURL: fileURL,
        imageID: uploadedFile.$id,
        location: post.location,
        imageHashURL: hash,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw new Error(" Post Creation Failed, Please try again");
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageID,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileID: string) {
  try {
    const filePreview = storage.getFilePreview(
      appwriteConfig.storageID,
      fileID,
      2000,
      2000,
      "top",
      100
    );

    if (!filePreview) throw new Error("File Preview Failed, Please try again");

    return filePreview;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileID: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageID, fileID);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.DatabaseID,
      appwriteConfig.postsCollectionID,
      [Query.orderDesc("$createdAt")]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function likePost(postID: string, newLikesList: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.postsCollectionID,
      postID,
      {
        likes: newLikesList,
      }
    );

    if (!updatedPost) throw Error;
    // console.log(updatedPost);

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(postID: string, userID: string) {
  try {
    const savedPostRecord = await databases.createDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.savesCollectionID,
      ID.unique(),
      {
        post: postID,
        user: userID,
      }
    );

    if (!savedPostRecord) throw Error;

    return savedPostRecord;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedRecord(savedPostRecordID: string) {
  try {
    const deletedSavedPostRecord = await databases.deleteDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.savesCollectionID,
      savedPostRecordID
    );

    if (!deletedSavedPostRecord) throw Error;

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getPostByID(postID: string) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.postsCollectionID,
      postID
    );

    if (!post) throw Error;

    console.log(post);
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IupdatePost) { 
  const hasFileToUpdate = post.file.length > 0;

  try {
    // Upload File to Storage

    let image = { imageID: post.imageID, imageURL: post.imageURL };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;
      const fileURL = getFilePreview(uploadedFile.$id);

      if (!fileURL) throw Error;

      image = { ...image, imageID: uploadedFile.$id, imageURL: fileURL };
    }
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const updatedPost = await databases.updateDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.postsCollectionID,
      post.postID,
      {
        caption: post.caption,
        tags: tags,
        imageURL: image.imageURL,
        imageID: image.imageID,
        location: post.location,
      }
    );

    if (!updatedPost) {

      // since updateFailed check if it was created with new image, if so then delete it otherwise retain old one

      if (hasFileToUpdate) await deleteFile(image.imageID);
      throw Error;
    }

    //since update was successfull check if it was created with new image then delete old image
    if(hasFileToUpdate) await deleteFile(post.imageID)

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postID: string, imageID: string) {

  if (!postID || !imageID) throw Error

  try {

    const postToDeleteFromSave = await getPostByID(postID)

    postToDeleteFromSave?.save?.map(async (savedPostRecord: Models.Document) => {
      if(!savedPostRecord) return
      await deleteSavedRecord(savedPostRecord.$id)
    })

    const deletePostStatus = await databases.deleteDocument(
        appwriteConfig.DatabaseID,
        appwriteConfig.postsCollectionID,
        postID
    )

    console.log(deletePostStatus)

    if(!deletePostStatus) throw Error

    const deleteFileStatus = await deleteFile(imageID)

    if(!deleteFileStatus) throw Error


    return { status: "ok" }
  } catch (error) {
    console.log(error)
  }
}

export async function searchedPosts(search: string) {
  try {
    const searchedPosts = await databases.listDocuments(
      appwriteConfig.DatabaseID,
      appwriteConfig.postsCollectionID,
      [Query.search("caption", search)]
    );

    if(!searchedPosts) throw Error

    return searchedPosts
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({pageParam}: {pageParam: number}) {

 const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(7)];

 if(pageParam) queries.push(Query.cursorAfter(pageParam.toString()))

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.DatabaseID,
      appwriteConfig.postsCollectionID,
      queries
    )

    if(!posts) throw Error

    return posts
   
  } catch (error) {
    console.log(error)
  }
}

export async function getInfiniteUsers({ pageParam }: { pageParam: number }) {
  const queries: any[] = [Query.orderDesc("$createdAt"), Query.limit(7)];

  if (pageParam) queries.push(Query.cursorAfter(pageParam.toString()));

  try {
    const allUsers = await databases.listDocuments(
      appwriteConfig.DatabaseID,
      appwriteConfig.usersCollectionID,
      queries
    );

    if (!allUsers) throw Error;

    return allUsers;
  } catch (error) {
    console.log(error);
  }
}

export async function getSavedPosts(userID: string) {

  try {
    const savedPostsDetails = await databases.listDocuments(
      appwriteConfig.DatabaseID,
      appwriteConfig.savesCollectionID,
      [Query.equal("user",userID)]
    );

    if (!savedPostsDetails) throw Error("You have no saved posts");

    
    return savedPostsDetails
  } catch (error) {
    console.log(error);
  }
}


export async function getUserByID(userDocumentID: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.usersCollectionID,
      userDocumentID
    );

    if (!user) throw Error;

    return user
  } catch (error) {
    console.log(error);
  }
}

export async function updateProfile(user: IupdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {

    let image = { imageID: user.imageID, imageURL: user.imageURL };

    if(hasFileToUpdate) {
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;
      const fileURL = getFilePreview(uploadedFile.$id);
      if (!fileURL) throw Error;
      image = { ...image, imageURL: fileURL, imageID: uploadedFile.$id };
    }

    const updatedUser = await databases.updateDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.usersCollectionID,
      user.userID,
      {
        name: user.name,
        username: user.username,
        imageID: image.imageID,
        imageURL: image.imageURL,
      }
    )

    if(!updatedUser) {
      if(hasFileToUpdate) await deleteFile((image.imageID).toString())
      throw Error
    }

    if(hasFileToUpdate) await deleteFile((user.imageID).toString())

    return updatedUser
  } catch (error) {
    console.log(error)
  }
}

export async function follow (followedByID: string, beingFollowedID: string) {
  try {
    const followRecord = await databases.createDocument(
      appwriteConfig.DatabaseID,
      appwriteConfig.followers_followingsCollectionID,
      ID.unique(),
      {
        followedBy: followedByID,
        beingFollowed: beingFollowedID,
      }
    );

    if(!followRecord) throw Error

    return followRecord
    
  } catch (error) {
    console.log(error)
  }
}

export async function doesFollow (followedByID: string, beingFollowedID: string) {
  try {
    const followRecord = await databases.listDocuments(
      appwriteConfig.DatabaseID,
      appwriteConfig.followers_followingsCollectionID,
      [Query.equal("followedBy", followedByID), Query.equal("beingFollowed", beingFollowedID)]
    )
    
    return followRecord ? true : false

  } catch (error) {
    console.log(error)
  }
}
