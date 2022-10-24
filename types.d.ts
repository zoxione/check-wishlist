import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  coverUrl?: string;
  address?: string;
  tiktokName: string;
  twitterName?: string;
  vkName?: string;
  telegramName?: string;
  instagramName?: string;
  createdAt: Date;
}

interface IGift {
  id: string;
  title: string;
  description?: string;
  shopName: string;
  shopUrl: string | null | undefined;
  price: number;
  createdAt: Date;
  imageUrl?: string;
  isGifted: boolean;
  userId: string;
}

interface ITransaction {
  id: string;
  giftId: string;
  gifterId: string;
  createdAt: Date;
  isCompleted: boolean;
}