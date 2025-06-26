import axios from 'axios';

export async function refreshAccessToken() {
  const refresh = localStorage.getItem('refresh');
  try {
    const res = await axios.post('http://localhost:8000/api/token/refresh/', {
      refresh: refresh,
    });
    localStorage.setItem('access', res.data.access);
    return res.data.access;
  } catch (error) {
    console.error('Refresh token expired or invalid');
    // log user out if refresh also fails
    localStorage.clear();
    window.location.href = '/';
    return null;
  }
}