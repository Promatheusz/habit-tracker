import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

import RewardsPage from './RewardsPage';
import { getPlayerData, getRewards } from '../services/api';

jest.mock('../components/Layout', () => function MockLayout({ children }) {
  return <div>{children}</div>;
});

jest.mock('../services/api', () => ({
  buyReward: jest.fn(),
  getPlayerData: jest.fn(),
  getRewards: jest.fn(),
}));

let container;
let root;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  document.body.removeChild(container);
  jest.clearAllMocks();
});

test('reward buy button is disabled when currency is too low', async () => {
  getPlayerData.mockResolvedValue({ currency: 5 });
  getRewards.mockResolvedValue([
    {
      id: 1,
      name: 'Movie night',
      description: 'Watch a movie',
      cost: 25,
      required_level: 1,
      purchased: 0,
    },
  ]);

  await act(async () => {
    root.render(<RewardsPage />);
  });

  const buyButton = Array.from(container.querySelectorAll('button')).find(
    (button) => button.textContent === 'Buy',
  );

  expect(buyButton.disabled).toBe(true);
});
