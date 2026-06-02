import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login, register } from '../services/api';

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-gray-900 p-8">
        <h1 className="mb-2 text-3xl font-bold text-white">Habit Tracker RPG</h1>
        <p className="mb-6 text-gray-400">
          {mode === 'login' ? 'Log in to continue your progress.' : 'Create your player account.'}
        </p>

        {error && <div className="mb-4 rounded-lg bg-red-950 p-3 text-red-200">{error}</div>}

        <label className="mb-2 block text-sm text-gray-300" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
        />

        <label className="mb-2 block text-sm text-gray-300" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mb-6 w-full rounded-lg border border-gray-700 bg-gray-950 p-3 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-yellow-500 px-4 py-3 font-bold text-gray-950 hover:bg-yellow-400 disabled:bg-gray-700"
        >
          {loading ? 'Working...' : mode === 'login' ? 'Log In' : 'Register'}
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="mt-4 w-full text-sm text-gray-300 hover:text-white"
        >
          {mode === 'login' ? 'Create an account' : 'Use an existing account'}
        </button>
      </form>
    </main>
  );
}

export default AuthPage;
