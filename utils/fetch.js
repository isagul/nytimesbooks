import axios from 'axios';
export const API = 'https://api.nytimes.com/svc/books/v3/lists/names.json';

export const fetchData = async () => {
  return await axios.get(API);
};