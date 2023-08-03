import axios from 'axios';
import { config } from 'dotenv';

config();

const { BASE_URL} = process.env;


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

export const getOsmData = async (bbox: any) => {
  console.log('bbox', bbox);
try {
  const path = `/api/0.6/map?bbox=${bbox}`;
  const response = await axiosInstance.get(path);
  return response.data;
} catch (error) {
  console.error(error);
  throw error;
}
};