import { type } from "os";

export interface User {

}

export interface IGift {
  title: string;
  image: string;
  price: number;
  isGifted: boolean;
  gifter: string | undefined;
}