import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { isExpired } from 'react-jwt';
import { setToken } from 'store/authSlice';
import store from 'store/store';

function getRandom(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeObjKey<T extends object>(obj: T, key: string) {
  const res = { ...obj };
  if (key in res) {
    delete res[key as keyof typeof res];
    return res;
  } else throw new Error();
}

function checkPassword(password: string) {
  const minimum8Chars = /^.{8,}$/;
  const withoutSpaces = /^[\S]*$/;
  const withoutSpecialChars = /^[^-,.\\/*()/]*$/;
  const onlyLatin = /^[a-zA-Z\d]+$/;
  const containsLetters = /^.*[a-zA-Z]+.*$/;
  // const beginWithoutDigit = /^\D.*$/

  if (!minimum8Chars.test(password)) return 'Too short password at least 8';
  if (!withoutSpaces.test(password)) return 'Spaces are not allowed';
  if (!withoutSpecialChars.test(password)) return 'Special chars are not allowed';
  if (!onlyLatin.test(password)) return 'only latin letters are allowed';
  if (!containsLetters.test(password)) return 'Password must contain letters';

  return null;
}

function getErrorMessage(status: FetchBaseQueryError | SerializedError) {
  if (typeof status == 'number') {
    if (status == 400) return 'Bad request';
    if (status == 401) return 'User does not exist';
    if (status == 409) return 'Login already exist';
  }
  return 'Unknown error';
}

function getFromStorage(key: string) {
  const storage = localStorage.getItem(key);
  return storage && JSON.parse(storage);
}

export { getRandom, removeObjKey, checkPassword, getErrorMessage, getFromStorage };
