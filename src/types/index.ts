export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageURL: string | URL;
  bio: string;
  imageID: string
};

export type INewUser = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type INavLink = {
  imgUrl: string,
  route: string,
  label: string
}

export type INewPost = {
  userId: string;
  caption: string;
  file: File[];
  location?: string;
  tags?: string;
};

export type IupdatePost = {
  caption: string;
  location: string;
  tags: string;
  imageID: string;
  imageURL: URL | string;
  file: File[];
  postID: string;
}

export type IupdateUser = {
  userID: string;
  name: string;
  username: string;
  email: string;
  imageURL: URL | string;
  imageID: string | URL;
  file: File[]
}
