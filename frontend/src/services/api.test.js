import { isAuthenticated, logout } from './api';

test('logout clears authentication state', () => {
  localStorage.setItem('habit_rpg_token', 'token');
  logout();

  expect(isAuthenticated()).toBe(false);
});
