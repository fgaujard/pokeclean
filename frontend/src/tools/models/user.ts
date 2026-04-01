export interface User {
  publicId: string;
  username: string;
  aka: string;
  bio: string;
  wallet: number;
  holidays: boolean;
  avatar: {
    imageUrl: string;
  };
}
