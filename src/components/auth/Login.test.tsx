import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginButton from './Login';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');

describe('LoginButton', () => {
  const loginWithRedirect: jest.Mock = jest.fn();

  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      loginWithRedirect,
    });
  });

  test('renders LoginButton and triggers login on click', () => {
    const { getByText } = render(<LoginButton />);
    fireEvent.click(getByText(/Log In/i));
    expect(loginWithRedirect).toHaveBeenCalled();
  });
});
