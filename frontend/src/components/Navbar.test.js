import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { Simulate } from 'react-dom/test-utils';

import Navbar from './Navbar';
import { logout } from '../services/api';

const mockNavigate = jest.fn();

jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => mockNavigate,
  }),
  { virtual: true },
);

jest.mock('../services/api', () => ({
  logout: jest.fn(),
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

test('logout clears auth and redirects to login', async () => {
  await act(async () => {
    root.render(<Navbar />);
  });

  const button = container.querySelector('button');

  await act(async () => {
    Simulate.click(button);
  });

  expect(logout).toHaveBeenCalledTimes(1);
  expect(mockNavigate).toHaveBeenCalledWith('/login');
});
