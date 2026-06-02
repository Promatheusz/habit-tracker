import Layout from '../components/Layout';
import XPBar from '../components/XPBar';
import TaskCard from '../components/TaskCard';

import { useState, useEffect } from 'react';
import { completeHabit, getHabitLogs, getHabits, getPlayerData } from '../services/api';

function Dashboard() {
  const [playerData, setPlayerData] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      const [player, habits, habitLogs] = await Promise.all([
        getPlayerData(),
        getHabits(),
        getHabitLogs(),
      ]);
      setPlayerData(player);
      setTaskList(habits);
      setLogs(habitLogs);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function completeTask(id) {
    try {
      const result = await completeHabit(id);
      setPlayerData(result.player);
      setTaskList((items) =>
        items.map((task) => (task.id === id ? { ...task, completed_today: 1 } : task)),
      );
      const habitLogs = await getHabitLogs();
      setLogs(habitLogs);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <Layout>
        <p className="text-gray-300">Loading dashboard...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-white">
            Welcome back, {playerData?.username}
          </h1>

          <p className="text-gray-400">Complete habits and gain XP.</p>
        </div>

        {error && <div className="rounded-lg bg-red-950 p-4 text-red-200">{error}</div>}

        <div className="rounded-lg bg-gray-900 p-6">
          <h2 className="mb-4 text-2xl font-bold text-white">Experience Progress</h2>

          <XPBar
            currentXP={playerData?.xp || 0}
            maxXP={playerData?.maxXP || 100}
            level={playerData?.level || 1}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-2 text-xl font-bold text-white">Currency</h3>

            <p className="text-3xl text-yellow-400">{playerData?.currency || 0}</p>
          </div>

          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-2 text-xl font-bold text-white">Current Level</h3>

            <p className="text-3xl text-green-400">{playerData?.level}</p>
          </div>

          <div className="rounded-lg bg-gray-900 p-6">
            <h3 className="mb-2 text-xl font-bold text-white">Remaining XP</h3>

            <p className="text-3xl text-blue-400">{playerData?.xpToNextLevel || 0}</p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-3xl font-bold text-white">Today&apos;s Habits</h2>

          <div className="space-y-4">
            {taskList.length === 0 && (
              <div className="rounded-lg bg-gray-900 p-5 text-gray-300">No active habits yet.</div>
            )}
            {taskList.slice(0, 4).map((task) => (
              <TaskCard key={task.id} task={task} onComplete={completeTask} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">Recent Completions</h2>

          <div className="space-y-3">
            {logs.length === 0 && (
              <div className="rounded-lg bg-gray-900 p-5 text-gray-300">
                Complete a habit to start your history.
              </div>
            )}
            {logs.slice(0, 5).map((log) => (
              <div key={log.id} className="rounded-lg bg-gray-900 p-4 text-gray-300">
                <span className="font-semibold text-white">{log.habit_name}</span> completed at{' '}
                {new Date(log.completed_at).toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
