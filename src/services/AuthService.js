import { axiosPublic } from '../Api/axios';

// Function to authenticate a user
async function loginUser(username, password) {
  try {
    const response = await axiosPublic.post('/auth', {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

// Function to logout a user
async function logoutUser() {
  // Simulate API call to logout user
  return new Promise((resolve) => {
    // Simulate successful logout
    resolve();
  });
}

export { loginUser, logoutUser };
