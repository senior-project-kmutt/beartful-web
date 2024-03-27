import axios from 'axios';

console.log(process.env.NEXT_PUBLIC_API_URL);
console.log(process.env.NEXT_PUBLIC_BASEPATH);
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});
