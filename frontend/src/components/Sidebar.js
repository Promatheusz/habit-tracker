import { FaHome, FaTasks, FaTrophy, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', icon: FaHome },
  { to: '/habits', label: 'Habits', icon: FaTasks },
  { to: '/rewards', label: 'Rewards', icon: FaTrophy },
  { to: '/profile', label: 'Profile', icon: FaUser },
];

function Sidebar() {
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen p-5 hidden md:block">
      <h2 className="text-3xl font-bold mb-10 text-yellow-400">Habit RPG</h2>

      <nav className="flex flex-col gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg p-3 transition ${
                  isActive ? 'bg-gray-800 text-yellow-300' : 'hover:bg-gray-800'
                }`
              }
            >
              <Icon />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
