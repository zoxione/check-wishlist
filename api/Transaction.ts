import useSWR from 'swr'
import { ITransaction } from "../types";
import { fetcher } from './User';

// хук для получения списка транзакций
export function useTransactions() {
  const { data, error } = useSWR(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?select=*`, fetcher)

  const transactions: ITransaction[] = data

  return {
    transactions: transactions,
    isLoading: !error && !data,
    isError: error
  }
}

export const CompleteTransaction = async (id: string) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': process.env.SUPABASE_API_KEY || '',
      'Authorization': process.env.SUPABASE_API_KEY || '',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ isCompleted: true }),
  }).then((res) => {
    if (res.ok) {

    }
    else {
      throw new Error("Error completing transaction");
    }
  });
}