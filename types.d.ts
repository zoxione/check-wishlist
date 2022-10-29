import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
      username: string;
      fullname?: string;
    };
  }
}

export interface IUser {
  id?: string;
  username: string;
  fullname?: string;
  email?: string;
  password: string;
  about?: string;
  imageUrl?: string;
  backgroundUrl?: string;
  address?: string;
  isVerified?: boolean;
  role?: string;
  tiktokName: string;
  twitterName?: string;
  vkName?: string;
  telegramName?: string;
  instagramName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGift {
  id?: string;
  title: string;
  description?: string;
  shopName: string;
  shopUrl: string;
  price: number;
  imageUrl?: string;
  isGifted?: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITransaction {
  id?: string;
  giftId: string;
  userId: string;
  gifterId: string;
  isCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}