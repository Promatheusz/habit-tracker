import { useEffect, useState } from 'react';

import Layout from '../components/Layout';
import { buyReward, getPlayerData, getRewards } from '../services/api';

function RewardsPage() {
  const [player, setPlayer] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRewards();
  }, []);

  async function loadRewards() {
    try {
      setLoading(true);
      const [playerData, rewardData] = await Promise.all([getPlayerData(), getRewards()]);
      setPlayer(playerData);
      setRewards(rewardData);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy(id) {
    try {
      const result = await buyReward(id);
      setPlayer(result.player);
      setMessage('Reward purchased.');
      await loadRewards();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Reward Shop</h1>
          <p className="text-gray-400">Spend currency on earned incentives.</p>
        </div>

        {error && <div className="rounded-lg bg-red-950 p-4 text-red-200">{error}</div>}
        {message && <div className="rounded-lg bg-green-950 p-4 text-green-200">{message}</div>}

        <div className="rounded-lg bg-gray-900 p-6">
          <h2 className="text-xl font-bold text-white">Currency Balance</h2>
          <p className="text-3xl text-yellow-400">{player?.currency || 0}</p>
        </div>

        {loading && <p className="text-gray-300">Loading rewards...</p>}
        <div className="grid gap-4 md:grid-cols-2">
          {!loading && rewards.length === 0 && (
            <div className="rounded-lg bg-gray-900 p-5 text-gray-300">
              No rewards are available at your current level.
            </div>
          )}
          {rewards.map((reward) => (
            <div key={reward.id} className="rounded-lg bg-gray-900 p-5">
              <h2 className="text-xl font-bold text-white">{reward.name}</h2>
              <p className="mt-2 text-gray-400">{reward.description}</p>
              <p className="mt-3 text-sm text-yellow-300">
                Cost {reward.cost} / Required level {reward.required_level}
              </p>
              <button
                disabled={reward.purchased || (player?.currency || 0) < reward.cost}
                onClick={() => handleBuy(reward.id)}
                className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 font-bold text-gray-950 hover:bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-300"
              >
                {reward.purchased ? 'Purchased' : 'Buy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default RewardsPage;
