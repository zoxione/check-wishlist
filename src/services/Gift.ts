import axios from 'axios';
import useSWR from 'swr';
import { IGift, ITransaction } from "../../types";
import { SERVER_URL } from '../data/constants';


export const fetcher = (url: RequestInfo | URL) => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
}).then((res) => res.json());


// Получение данных списка подарков по userId
// C помощью useSWR мы получаем данные подарка и кэшируем их
// Возвращает IGift[]
export function GetGiftsUser(userId: string) {
  const { data, error, mutate } = useSWR(`${SERVER_URL}/gifts?userId=${userId}`, fetcher, { refreshInterval: 1000 })

  const gifts: IGift[] = data

  return {
    gifts: gifts,
    mutate: mutate,
    isLoading: !error && !data,
    isError: error
  }
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
  await axios.post(`${SERVER_URL}/gifts`,
    gift
  )
    .then(function (response) {
      console.log("[AddGift]: " + response);
    })
    .catch(function (error) {
      console.log("[AddGift]: " + error);
      throw new Error("Error adding gift");
    })
}

// Дарение подарка
export const GiveGift = async (transaction: ITransaction) => {
  await axios.put(`${SERVER_URL}/gifts_give`,
    transaction
  )
    .then(function (response) {
      console.log("[GiveGift]: " + response);
    })
    .catch(function (error) {
      console.log("[GiveGift]: " + error);
      throw new Error("Error giving gift");
    })
}

// Обновление данных подарка
export const UpdateGift = async (gift: IGift) => {
  await axios.put(`${SERVER_URL}/gifts/${gift.id}`,
    gift
  )
    .then(function (response) {
      console.log("[UpdateGift]: " + response);
    })
    .catch(function (error) {
      console.log("[UpdateGift]: " + error);
      throw new Error("Error updating gift");
    })
}

// Удаление подарка
export const DeleteGift = async (id: string) => {
  await axios.delete(`${SERVER_URL}/gifts/${id}`)
    .then(function (response) {
      console.log("[DeleteGift]: " + response);
    })
    .catch(function (error) {
      console.log("[DeleteGift]: " + error);
      throw new Error("Error deleting gift");
    })
}

// Очистка списка желаний
export const DeleteWishlistGifts = async (userId: string) => {
  await axios.delete(`${SERVER_URL}/gifts`, {
    params: {
      userId: userId,
      isGifted: false
    }
  })
    .then(function (response) {
      console.log("[DeleteWishlistGifts]: " + response);
    })
    .catch(function (error) {
      console.log("[DeleteWishlistGifts]: " + error);
      throw new Error("Error deleting gift");
    })
}

// Очистка списка подаренных подарков
export const DeleteGiftedGifts = async (userId: string) => {
  await axios.delete(`${SERVER_URL}/gifts`, {
    params: {
      userId: userId,
      isGifted: true
    }
  })
    .then(function (response) {
      console.log("[DeleteGiftedGifts]: " + response);
    })
    .catch(function (error) {
      console.log("[DeleteGiftedGifts]: " + error);
      throw new Error("Error deleting gift");
    })
}