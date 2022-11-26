import axios from 'axios';
import useSWR from 'swr';
import { SERVER_URL } from '../data/constants';
import { fetcher } from './Gift';


// Получение всех транзакций
// C помощью useSWR мы получаем транзакции и кэшируем их
// Возвращает ITransaction[]
export function useTransactions() {
  const { data, error } = useSWR(`${SERVER_URL}/transactions`, fetcher, { refreshInterval: 5000 })

  return {
    transactions: data as any[],
    isLoading: !error && !data,
    isError: error
  }
}

// Получение всех транзакций по userId
// C помощью useSWR мы получаем транзакции и кэшируем их
// Возвращает ITransaction[]
export function useTransactionsFromUserId(userId: string) {
  const { data, error } = useSWR(`${SERVER_URL}/transactions?userId=${userId}`, fetcher, { refreshInterval: 5000 })

  return {
    transactions: data as any[],
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