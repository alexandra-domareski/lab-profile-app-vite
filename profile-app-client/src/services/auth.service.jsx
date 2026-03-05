import axios from 'axios';

const API_URL = 'http://localhost:5005';

const authService = {
  signUp: (userData) => axios.post(`${API_URL}/api/auth/signup`, userData),
  login: (userData) => axios.post(`${API_URL}/api/auth/login`, userData),
  verifyToken: (token) =>
    axios.get(`${API_URL}/api/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  uploadPhoto: (formData, token) =>
    axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
  getCurrentUser: (token) =>
    axios.get(`${API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  editUser: (userData, token) =>
    axios.put(`${API_URL}/api/user`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export default authService;
