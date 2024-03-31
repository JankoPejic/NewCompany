import axios from 'axios';
import { getToken } from '../helpers/localStorage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  params: {},
});

axiosInstance.interceptors.request.use(async (config) => {
  const { token } = getToken();
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      (error.response.data === 'A token is required for authentication' ||
        error.response.data === 'Invalid Token')
    ) {
      originalRequest._retry = true;
      const response = await axiosInstance.get('/refresh');
      const { token: newToken, refreshToken: newRefreshtoken } = response.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('refreshToken', newRefreshtoken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      axios.config.headers.authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/get-user-info');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user data');
  }
};

// Create a function to cancel a specific API call
export const cancelAPICall = (token) => {
  if (token) {
    token.cancel('Request canceled');
  }
};

export default axiosInstance;
