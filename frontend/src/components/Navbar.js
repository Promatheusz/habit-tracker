import { useNavigate } from 'react-router-dom';

import { logout } from '../services/api';

function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 p-5 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Habit Tracker RPG</h1>

      <button
        onClick={handleLogout}
        className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;
