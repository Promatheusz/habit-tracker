const API_URL = 'http://localhost:5001';

export async function getPlayerData() {
  const response = await fetch(`${API_URL}/api/player`);

  if (!response.ok) {
    throw new Error('Failed to fetch player data');
  }

  return response.json();
}
