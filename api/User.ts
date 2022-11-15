import useSWR from 'swr';
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


// Получение данных пользователя по id
// C помощью useSWR мы получаем данные пользователя и кэшируем их
// Возвращает IUser
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

// Получение данных пользователя по id
// Возвращает IUser
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

// Получение данных пользователя по username
// Возвращает IUser
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

// Добавление нового пользователя
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

// Обновление данных пользователя
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

// Удаление пользователя
export const DeleteUser = async (id: string) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?userId=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then((res) => {
    if (res.ok) {
      console.log("User transactions deleted");
    }
    else {
      throw new Error("Error deleting transactions");
    }
  });

  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?gifterId=eq.${id}`, {
    method: 'DELETE',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
  }).then((res) => {
    if (res.ok) {
      console.log("Transactions deleted");
    }
    else {
      throw new Error("Error deleting transactions");
    }
  });

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