import * as userApi from "../api/api.user";
import * as apiTweet from "../api/apit.tweet";
import * as authApi from "../api/api.auth";

import { sleep } from "../api/helpers";
const customSleep = async () => {
  const sleepTime = 200;
  await sleep(sleepTime);
};

export async function getUsers() {
  await customSleep();
  return userApi.getUsers();
}

export async function signup({ firstName, lastName, email, password }) {
  await customSleep();
  return authApi.signup({ firstName, lastName, email, password });
}

export async function login({ email, password }) {
  await customSleep();
  return authApi.login({ email, password });
}

export async function logout() {
  await customSleep();
  return authApi.logout();
}

export async function getActiveUser() {
  await customSleep();
  return userApi.getActiveUser();
}

export async function getUserById(id) {
  await customSleep();
  return userApi.getUserById(id);
}

export async function createTweet({ message, user }) {
  await customSleep();
  return apiTweet.create({ message, user });
}

export function getTweets() {
  return apiTweet.getTweets();
}

export function subscribeToNewTweets(cb) {
  return apiTweet.subscribe(cb);
}

export function formatDate(date) {
  var monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  const leftPade = num => {
    let str = "" + num;
    return str.length === 1 ? `0${str}` : str;
  };

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = leftPade(date.getHours());
  const minutes = leftPade(date.getMinutes());

  const dateString = `${hours}:${minutes}, ${day}.${monthNames[monthIndex]} ${year}`;
  return dateString;
}
