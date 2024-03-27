import axios from 'axios';
import { getToken } from '../helpers/localStorage';

const baseURL = process.env.REACT_APP_API;
export const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// console.log('GANJEEBOY', process.env.REACT_APP_API);
// axiosInstance.interceptors.request.use(async (config) => {
//   const { token } = getToken();

//   if (token) config.headers.authorization = `${token}`;

//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (
//       error.response &&
//       (error.response.data === 'A token is required for authentication' ||
//         error.response.data === 'Invalid Token')
//     ) {
//       window.location.href = process.env.REACT_APP_BASEPATH;
//       return false;
//     }

//     //return Promise.reject(error);
//     return error;
//   }
// );

// // Create a function to cancel a specific API call
// export const cancelAPICall = (token) => {
//   if (token) {
//     token.cancel('Request canceled');
//   }
// };

// export default axiosInstance;
