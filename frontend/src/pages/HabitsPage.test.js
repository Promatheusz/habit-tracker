import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';

import HabitsPage from './HabitsPage';
import { createHabit, getHabits, updateHabit } from '../services/api';

jest.mock('../components/Layout', () => function MockLayout({ children }) {
  return <div>{children}</div>;
});

jest.mock('../services/api', () => ({
  completeHabit: jest.fn(),
  createHabit: jest.fn(),
  deleteHabit: jest.fn(),
  getHabits: jest.fn(),
  updateHabit: jest.fn(),
}));

let container;
let root;

function changeValue(element, value) {
  act(() => {
    Simulate.change(element, { target: { value } });
  });
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  getHabits.mockResolvedValue([]);
  createHabit.mockResolvedValue({});
  updateHabit.mockResolvedValue({});
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  document.body.removeChild(container);
  jest.clearAllMocks();
});

test('habit form calls create habit API', async () => {
  await act(async () => {
    root.render(<HabitsPage />);
  });

  changeValue(container.querySelector('input[placeholder="Habit name"]'), 'Read');

  await act(async () => {
    Simulate.submit(container.querySelector('form'));
  });

  expect(createHabit).toHaveBeenCalledWith(
    expect.objectContaining({
      name: 'Read',
      difficulty: 'easy',
      frequency: 'daily',
    }),
  );
});

test('habit form calls update habit API after edit', async () => {
  getHabits.mockResolvedValue([
    {
      id: 10,
      name: 'Old habit',
      description: '',
      difficulty: 'easy',
      frequency: 'daily',
      xp_reward: 10,
      currency_reward: 10,
      completed_today: 0,
    },
  ]);

  await act(async () => {
    root.render(<HabitsPage />);
  });

  const editButton = Array.from(container.querySelectorAll('button')).find(
    (button) => button.textContent === 'Edit',
  );

  await act(async () => {
    Simulate.click(editButton);
  });

  changeValue(container.querySelector('input[placeholder="Habit name"]'), 'Updated habit');

  await act(async () => {
    Simulate.submit(container.querySelector('form'));
  });

  expect(updateHabit).toHaveBeenCalledWith(
    10,
    expect.objectContaining({
      name: 'Updated habit',
    }),
  );
});

test('invalid weekly habit form shows a clear error', async () => {
  await act(async () => {
    root.render(<HabitsPage />);
  });

  changeValue(container.querySelector('input[placeholder="Habit name"]'), 'Weekly habit');
  changeValue(container.querySelectorAll('select')[1], 'weekly');

  await act(async () => {
    Simulate.submit(container.querySelector('form'));
  });

  expect(createHabit).not.toHaveBeenCalled();
  expect(container.textContent).toContain('Weekly habits need target weekdays');
});
