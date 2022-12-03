import Joi from "joi";

export const userSchema = {
  username: Joi.string().regex(/^[A-Za-z0-9]+$/).min(3).max(13).messages({
    'string.pattern.base': 'Имя пользователя должно состоять только из латинских букв и цифр',
    'string.base': 'Имя должно быть строкой',
    'string.empty': 'Имя не может быть пустым',
    'string.min': 'Имя должно быть больше 2 символов',
    'string.max': 'Имя должно быть меньше 14 символов',
  }),
  fullname: Joi.string().max(29).allow('').messages({
    'string.base': 'ФИО должно быть строкой',
    'string.max': 'ФИО должно быть меньше 30 символов',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).messages({
    'string.base': 'Почта должен быть строкой',
    'string.empty': 'Почта не может быть пустым',
    'string.email': 'Почта должен быть валидным',
  }),
  password: Joi.string().regex(/^[A-Za-z0-9]+$/).min(6).max(19).messages({
    'string.pattern.base': 'Пароль должен состоять только из латинских букв и цифр',
    'string.base': 'Пароль должен быть строкой',
    'string.empty': 'Пароль не может быть пустым',
    'string.min': 'Пароль должен быть больше 5 символов',
    'string.max': 'Пароль должен быть меньше 20 символов',
  }),
  about: Joi.string().max(255).allow('').messages({
    'string.base': 'О себе должно быть строкой',
    'string.max': 'О себе должно быть меньше 256 символов',
  }),
  imageUrl: Joi.string().uri().allow('').messages({
    'string.base': 'Ссылка должна быть строкой',
    'string.uri': 'Ссылка должна быть валидной',
  }),
  backgroundUrl: Joi.string().uri().allow('').messages({
    'string.base': 'Ссылка должна быть строкой',
    'string.uri': 'Ссылка должна быть валидной',
  }),
  address: Joi.string().max(29).allow('').messages({
    'string.base': 'Адрес должен быть строкой',
    'string.max': 'Адрес должен быть меньше 30 символов',
  }),
  tiktokName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
    'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
    'string.base': 'Имя должно быть строкой',
    'string.max': 'Имя должно быть меньше 20 символов',
  }),
  twitterName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
    'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
    'string.base': 'Имя должно быть строкой',
    'string.max': 'Имя должно быть меньше 20 символов',
  }),
  vkName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
    'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
    'string.base': 'Имя должно быть строкой',
    'string.max': 'Имя должно быть меньше 20 символов',
  }),
  telegramName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
    'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
    'string.base': 'Имя должно быть строкой',
    'string.max': 'Имя должно быть меньше 20 символов',
  }),
  instagramName: Joi.string().regex(/^[A-Za-z0-9]+$/).max(19).allow('').messages({
    'string.pattern.base': 'Имя должно состоять только из латинских букв и цифр',
    'string.base': 'Имя должно быть строкой',
    'string.max': 'Имя должно быть меньше 20 символов',
  }),
}


export const giftSchema = {
  description: Joi.string().max(255).allow('').messages({
    'string.base': 'Описание должно быть строкой',
    'string.max': 'Описание должно быть меньше 256 символов',
  }),
  shopUrl: Joi.string().uri().messages({
    'string.base': 'Ссылка должна быть строкой',
    'string.empty': 'Ссылка не может быть пустой',
    'string.uri': 'Ссылка должна быть валидной',
  }),
} 