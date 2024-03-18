import axios, { AxiosResponse } from 'axios';
import { Book } from './types.ts'

const API_URL = 'http://localhost:3005/items';


export function getItems(): Promise<AxiosResponse<Book[]>> {
  return axios.get(API_URL);
}
export function getItem(id: string): Promise<AxiosResponse<Book>> {
  return axios.get(`${API_URL}/${id}`);
}

export function createItem(item: Book): Promise<AxiosResponse<Book>> {
  return axios.post(API_URL, item);
}

export function updateItem(id: string, item: Book): Promise<AxiosResponse<Book>> {
  return axios.put(`${API_URL}/${id}`, item);
}

export function deleteItem(id: string): Promise<AxiosResponse<void>> {
  return axios.delete(`${API_URL}/${id}`);
}
