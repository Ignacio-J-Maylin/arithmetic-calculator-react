export const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
  };
  
  export const getAuth = () => ({
    token: localStorage.getItem('token'),
    refresh_token: localStorage.getItem('refresh_token'),
    username: localStorage.getItem('username'),
  });
  
  export const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  