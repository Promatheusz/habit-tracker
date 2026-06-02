const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
const TOKEN_KEY = 'habit_rpg_token';

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const token = getToken();
  const response = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
}

export async function register(username, password) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  setToken(data.token);
  return data.player;
}

export async function login(username, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  setToken(data.token);
  return data.player;
}

export function logout() {
  clearToken();
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export const getCurrentPlayer = () => request('/auth/me');
export const getPlayerData = () => request('/player');
export const getHabits = () => request('/habits');
export const getHabitLogs = () => request('/habit-logs');
export const createHabit = (habit) =>
  request('/habits', { method: 'POST', body: JSON.stringify(habit) });
export const updateHabit = (id, habit) =>
  request(`/habits/${id}`, { method: 'PUT', body: JSON.stringify(habit) });
export const deleteHabit = (id) => request(`/habits/${id}`, { method: 'DELETE' });
export const completeHabit = (id) => request(`/habits/${id}/complete`, { method: 'POST' });
export const getRewards = () => request('/rewards');
export const getPurchasedRewards = () => request('/rewards/purchased');
export const buyReward = (id) => request(`/rewards/${id}/buy`, { method: 'POST' });
