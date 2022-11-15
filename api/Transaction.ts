import useSWR from 'swr';
import { fetcher } from './User';


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

// export const GetTransactionsData = async () => {
//   const { data, error, status } = await supabaseClient
//     .from('Transaction')
//     .select(`
//       id,
//       createdAt,
//       Gift (
//         title,
//         shopUrl,
//         price
//       ),
//       Gifter:gifterId(
//         username
//       ),
//       User:userId(
//         username
//       )
//     `)

//   if (error && status !== 406) {
//     throw new Error("Error fetching data in transactions")
//   }

//   let transactionsData = []


//   if (data) {
//     return data
//   }
// }

// Выполнение транзакции
export const CompleteTransaction = async (id: string) => {
  await fetch(`https://cserfwfqoxxsyqezqezy.supabase.co/rest/v1/Transaction?id=eq.${id}`, {
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