// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');

describe('App', () => {
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
    });
  });

  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText(/To create an NFT, link your wallet,/i)).toBeInTheDocument();
  });

  test('renders login button when not authenticated', () => {
    render(<App />);
    expect(screen.getByText(/Log In/i)).toBeInTheDocument();
  });

  test('renders profile, logout button, and NFT form when authenticated', () => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: true,
    });
    render(<App />);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
    expect(screen.getByText(/Mint NFT/i)).toBeInTheDocument();
  });
});
