import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import XPBar from '../components/XPBar';
import { getCurrentPlayer, getHabitLogs, getPurchasedRewards } from '../services/api';

function ProfilePage() {
  const [player, setPlayer] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const [playerData, purchasedRewards, habitLogs] = await Promise.all([
          getCurrentPlayer(),
          getPurchasedRewards(),
          getHabitLogs(),
        ]);
        setPlayer(playerData);
        setRewards(purchasedRewards);
        setLogs(habitLogs);
      } catch (err) {
        setError(err.message);
      }
    }

    loadProfile();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Profile</h1>
          <p className="text-gray-400">Your RPG progression and unlocked rewards.</p>
        </div>

        {error && <div className="rounded-lg bg-red-950 p-4 text-red-200">{error}</div>}

        {player && (
          <div className="rounded-lg bg-gray-900 p-6">
            <h2 className="mb-4 text-2xl font-bold text-white">{player.username}</h2>
            <XPBar currentXP={player.xp} maxXP={player.maxXP} level={player.level} />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-gray-950 p-4 text-gray-300">
                Total XP <span className="block text-2xl text-white">{player.xp}</span>
              </div>
              <div className="rounded-lg bg-gray-950 p-4 text-gray-300">
                Currency <span className="block text-2xl text-white">{player.currency}</span>
              </div>
              <div className="rounded-lg bg-gray-950 p-4 text-gray-300">
                Level <span className="block text-2xl text-white">{player.level}</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">Purchased Rewards</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {rewards.length === 0 && (
              <div className="rounded-lg bg-gray-900 p-5 text-gray-300">
                No rewards purchased yet.
              </div>
            )}
            {rewards.map((reward) => (
              <div key={reward.id} className="rounded-lg bg-gray-900 p-5">
                <h3 className="font-bold text-white">{reward.name}</h3>
                <p className="text-gray-400">{reward.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold text-white">Recent Completions</h2>
          <div className="space-y-3">
            {logs.length === 0 && (
              <div className="rounded-lg bg-gray-900 p-5 text-gray-300">
                No habit completions yet.
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

export default ProfilePage;
