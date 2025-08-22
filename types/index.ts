export type UserInfo = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  mobile?: string;
};

export type LoginResponse = {
  success: boolean;
  message?: string;
  user?: UserInfo;
  emailVerified?: boolean;
};

export type UpdateProfileData = {
  id: string;
  name: string;
  email: string;
  avatar: Blob;
  mobile?: string;
};
