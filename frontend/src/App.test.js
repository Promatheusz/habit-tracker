import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

import { ProtectedRoute } from './App';
import { isAuthenticated } from './services/api';

jest.mock(
  'react-router-dom',
  () => {
    const React = require('react');

    return {
      BrowserRouter: ({ children }) => <div>{children}</div>,
      Navigate: ({ to }) => <div>Redirect to {to}</div>,
      Route: ({ element }) => element,
      Routes: ({ children }) => <div>{children}</div>,
    };
  },
  { virtual: true },
);

jest.mock('./services/api', () => ({
  isAuthenticated: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
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

test('protected routes redirect unauthenticated users', async () => {
  isAuthenticated.mockReturnValue(false);

  await act(async () => {
    root.render(
      <ProtectedRoute>
        <div>Secret page</div>
      </ProtectedRoute>,
    );
  });

  expect(container.textContent).toContain('Redirect to /login');
  expect(container.textContent).not.toContain('Secret page');
});

test('protected routes render authenticated content', async () => {
  isAuthenticated.mockReturnValue(true);

  await act(async () => {
    root.render(
      <ProtectedRoute>
        <div>Secret page</div>
      </ProtectedRoute>,
    );
  });

  expect(container.textContent).toContain('Secret page');
});
