import axios from 'axios';
import useSWR from 'swr';
import { SERVER_URL } from '../data/constants';
import { fetcher } from './Gift';


// Получение всех транзакций
// C помощью useSWR мы получаем транзакции и кэшируем их
// Возвращает ITransaction[]
export function useTransactions() {
  const { data, error } = useSWR(
    `https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?select=
    *,
    Gift(*),
    Gifter:gifterId(*),
    User:userId(*)`,
    fetcher
  )

  const transactions: any[] = data

  return {
    transactions: transactions,
    isLoading: !error && !data,
    isError: error
  }
}

// Получение всех транзакций по userId
// C помощью useSWR мы получаем транзакции и кэшируем их
// Возвращает ITransaction[]
export function useTransactionsFromUserId(userId: string) {
  const { data, error } = useSWR(
    `https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?userId=eq.${userId}&select=
    *,
    Gift(*),
    Gifter:gifterId(*),
    User:userId(*)`,
    fetcher
  )

  const transactions: any[] = data

  return {
    transactions: transactions,
    isLoading: !error && !data,
    isError: error
  }
}

// Выполнение транзакции
export const CompleteTransaction = async (id: string) => {
  await axios.patch(`${SERVER_URL}/transactions_complete/${id}`)
    .then(function (response) {
      console.log("[CompleteTransaction]: " + response);
    })
    .catch(function (error) {
      console.log("[CompleteTransaction]: " + error);
      throw new Error("Error completing transaction");
    })
}