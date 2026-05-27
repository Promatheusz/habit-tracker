import { FaHome, FaTasks, FaTrophy, FaUser } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-5 hidden md:block">
      <h2 className="text-3xl font-bold mb-10 text-yellow-400">Habit RPG</h2>

      <nav className="flex flex-col gap-4">
        <button className="flex items-center gap-3 hover:bg-gray-800 p-3 rounded-xl transition">
          <FaHome />
          Dashboard
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-800 p-3 rounded-xl transition">
          <FaTasks />
          Tasks
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-800 p-3 rounded-xl transition">
          <FaTrophy />
          Rewards
        </button>

        <button className="flex items-center gap-3 hover:bg-gray-800 p-3 rounded-xl transition">
          <FaUser />
          Profile
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
