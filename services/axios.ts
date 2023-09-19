import { API_URL } from '@/config/constants';
import axios from 'axios';

export default axios.create({
  baseURL: API_URL
});
