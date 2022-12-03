import axios from 'axios';
import { IUser } from "../../types";
import { SERVER_URL } from '../data/constants';


// Получение данных пользователя по id
// Возвращает IUser
export const GetUserById = async (id: string) => {
  let user: IUser | null = null;

  await axios.get(`${SERVER_URL}/users`, {
    params: {
      id: id
    }
  })
    .then(function (response) {
      if (response.data != '' && response.data != null) {
        user = response.data as IUser;
      }
    })
    .catch(function (error) {
      console.log("[GetUserById]: " + error);
    })

  return user;
}

// Получение данных пользователя по username
// Возвращает IUser
export const GetUserByUsername = async (username: string) => {
  let user: IUser | null = null;

  await axios.get(`${SERVER_URL}/users`, {
    params: {
      username: username
    }
  })
    .then(function (response) {
      if (response.data != '' && response.data != null) {
        user = response.data as IUser;
      }
    })
    .catch(function (error) {
      console.log("[GetUserFromUsername]: " + error);
    })

  return user;
}

// Добавление нового пользователя
export const AddUser = async (user: IUser) => {
  await axios.post(`${SERVER_URL}/users`,
    user
  )
    .then(function (response) {
      console.log("[AddUser]: " + response);
    })
    .catch(function (error) {
      console.log("[AddUser]: " + error);
      throw new Error("Error adding user");
    })
}

// Обновление данных пользователя
export const UpdateUser = async (user: IUser) => {
  await axios.put(`${SERVER_URL}/users/${user.id}`,
    user
  )
    .then(function (response) {
      console.log("[UpdateUser]: " + response);
    })
    .catch(function (error) {
      console.log("[UpdateUser]: " + error);
      throw new Error("Error updating user");
    })
}

// Удаление пользователя
export const DeleteUser = async (id: string) => {
  await axios.delete(`${SERVER_URL}/users/${id}`)
    .then(function (response) {
      console.log("[DeleteUser]: " + response);
    })
    .catch(function (error) {
      console.log("[DeleteUser]: " + error);
      throw new Error("Error deleting user");
    })
}