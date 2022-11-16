import useSWR from 'swr';
import { IGift, ITransaction } from "../types";
import { fetcher } from './User';


// Получение данных списка подарков по userId
// C помощью useSWR мы получаем данные подарка и кэшируем их
// Возвращает IGift[]
export function useGifts(userId: string) {
  const { data, error, mutate } = useSWR(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?userId=eq.${userId}&select=*`, fetcher, { refreshInterval: 1000 })

  const gifts: IGift[] = data

  return {
    gifts: gifts,
    mutate: mutate,
    isLoading: !error && !data,
    isError: error
  }
}

// Получение данных подарка по userId
// Возвращает IGift[]
export const GetGifts = async (userId: string) => {
  let gifts: IGift[] | null = null;

  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?userId=eq.${userId}&select=*`, {
    method: 'GET',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    else {
      throw new Error("Error getting gifts");
    }
  });
}

// Парсинг данных подарка с сервера
// Возвращает IGift
export const ParseGift = async (shopName: string, shopUrl: string) => {
  const parseResponse = await fetch(`https://fastapi-parser.herokuapp.com/${shopName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shopUrl: shopUrl }),
  }).then(res => res.json());

  return parseResponse;
}

// Добавление нового подарка
export const AddGift = async (gift: IGift) => {
  await fetch('https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift', {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(gift),
  }).then((res) => {
    if (res.ok) {

    }
    else {
      throw new Error("Error adding gift");
    }
  });
}

// Дарение подарка
export const GiveGift = async (transaction: ITransaction) => {
  await fetch('https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction', {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(transaction),
  }).then((res) => {
    if (res.ok) {

    }
    else {
      throw new Error("Error giving gift");
    }
  });

  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?id=eq.${transaction.giftId}`, {
    method: 'PATCH',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ isGifted: true }),
  }).then((res) => {
    if (res.ok) {

    }
    else {
      throw new Error("Error giving gift");
    }
  });
}

// Обновление данных подарка
export const UpdateGift = async (gift: IGift) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?id=eq.${gift.id}`, {
    method: 'PATCH',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(gift),
  }).then((res) => {
    if (res.ok) {

    }
    else {
      throw new Error("Error updating gift");
    }
  });
}

// Удаление подарка
export const DeleteGift = async (id: string) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then((res) => {
    if (res.ok) {
    }
    else {
      throw new Error("Error deleting gift");
    }
  });
}

// Очистка списка желаний
export const DeleteWishlistGifts = async (userId: string) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?userId=eq.${userId}&isGifted=eq.false`, {
    method: 'DELETE',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then((res) => {
    if (res.ok) {
      console.log("Deleted wishlist gifts");
    }
    else {
      throw new Error("Error deleting gifts");
    }
  });
}

// Очистка списка подаренных подарков
export const DeleteGiftedGifts = async (userId: string) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?userId=eq.${userId}`, {
    method: 'DELETE',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then((res) => {
    if (res.ok) {
      console.log("Gifts deleted")
    }
    else {
      throw new Error("Error deleting transactions");
    }
  });

  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?userId=eq.${userId}&isGifted=eq.true`, {
    method: 'DELETE',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then((res) => {
    if (res.ok) {
      console.log("Gifts deleted")
    }
    else {
      throw new Error("Error deleting gift");
    }
  });
}