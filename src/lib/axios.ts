import { SERVER_URL } from "../data/constants";

export const axios = require('axios').default;


axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
  headers: {
    'Apllication': 'application/json',
  }
});