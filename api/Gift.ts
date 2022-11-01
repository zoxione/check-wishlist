import useSWR from 'swr'
import { IGift, ITransaction } from "../types";
import { fetcher } from './User';

// хук для получения подарка
export function useGift(userId: string) {
  const { data, error, mutate } = useSWR(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?userId=eq.${userId}&select=*`, fetcher)

  let gift: IGift | null = null;
  if (data && data.length > 0) {
    gift = data[0]
  }

  return {
    gift: gift,
    mutate: mutate,
    isLoading: !error && !data,
    isError: error
  }
}

// хук для получения списка подарков
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

export const DeleteGiftedGifts = async (userId: string) => {
  let gifts = GetGifts(userId);

  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Gift?isGifted=eq.true`, {
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
