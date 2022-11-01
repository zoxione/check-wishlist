import useSWR from 'swr'
import { IUser } from "../types";

export const fetcher = (url: RequestInfo | URL) => fetch(url, {
  method: 'GET',
  headers: {
    'apikey': process.env.SUPABASE_API_KEY || '',
    'Authorization': process.env.SUPABASE_API_KEY || '',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  },
}).then((res) => res.json());

// хук для получения пользователя
export function useUser(id: string) {
  const { data, error } = useSWR(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/User?id=eq.${id}&select=*`, fetcher)
  let user: IUser | null = null;

  if (data && data.length > 0) {
    user = data[0]
  }

  return {
    user: user,
    isLoading: !error && !data,
    isError: error
  }
}


export const AddUser = async (user: IUser) => {
  await fetch('https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/User', {
    method: 'POST',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {

    }
    else {
      throw new Error("Error adding user");
    }
  });
}

export const GetUserFromId = async (id: string) => {
  let user: IUser | null = null;

  const userResponse = await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/User?id=eq.${id}&select=*`, {
    method: 'GET',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then(res => res.json());

  if (userResponse.length > 0) {
    user = userResponse[0];
  }

  return user;
}

export const GetUserFromUsername = async (username: string) => {
  let user: IUser | null = null;

  const userResponse = await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/User?username=eq.${username}&select=*`, {
    method: 'GET',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then(res => res.json());

  if (userResponse.length > 0) {
    user = userResponse[0];
  }

  return user;
}


export const UpdateUser = async (user: IUser) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/User?username=eq.${user.username}`, {
    method: 'PATCH',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(user),
  }).then((res) => {
    if (res.ok) {
      console.log("User updated");
    }
    else {
      throw new Error("Error updating user");
    }
  });
}


export const DeleteUser = async (id: string) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/User?id=eq.${id}`, {
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
      throw new Error("Error deleting user");
    }
  });
}