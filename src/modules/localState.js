import { addCity } from './utils';

const LOCAL_STORAGE_KEY = "cities";

export function saveToLocalState(payload) {

  const cities = localStorage.getItem(LOCAL_STORAGE_KEY)
   ?
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
   : [];

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(addCity(cities, payload)));

}

export function loadFromLocalState() {
  return localStorage.getItem(LOCAL_STORAGE_KEY)
    ?
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    : [];
}
