import axiosInstance from './context/axiosConfig'; 

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const loginUser = (username, password) =>
  axiosInstance.post('/login', { username, password });

export const signupUser = (username, password) =>
  axiosInstance.post('/signup', { username, password });

export const refreshAuthToken = (refreshToken) =>
  axiosInstance.post('/refresh', { refresh_token: refreshToken });

export const logoutUser = () => axiosInstance.post('/logout');

export const addCredits = (credits) =>
  axiosInstance.put('/users/credits', { credits, action: 'add' });

export const removeCredits = (credits) =>
  axiosInstance.put('/users/credits', { credits, action: 'remove' });

export const getUserCredits = () => axiosInstance.get('/users/credits');

export const performOperation = (operationType, a, b = null) =>
  axiosInstance.post('/users/operation', { operation_type: operationType, a, b });

export const getRecords = (params) =>
  axiosInstance.get('/records/history', { params });

export const deleteRecord = (recordId) =>
  axiosInstance.delete(`/records/delete`, { params: { record_id: recordId } });

export default axiosInstance;
