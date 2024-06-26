export const getToken = () => {
  const token = localStorage.getItem('token');

  return { token };
};

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
