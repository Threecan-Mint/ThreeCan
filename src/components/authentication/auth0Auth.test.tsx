import { renderHook, act } from '@testing-library/react';
import { useAuth0 } from "@auth0/auth0-react";
import useAppState from '../../useAppState';
import { useAuth0Auth } from './auth0Auth';

// Mock dependencies
jest.mock("@auth0/auth0-react");
jest.mock("../../useAppState");

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

describe('useAuth0Auth', () => {
  let mockUpdateState: jest.Mock;
  let mockGetAccessTokenSilently: jest.Mock;

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    mockUpdateState = jest.fn();
    mockGetAccessTokenSilently = jest.fn();

    (useAuth0 as jest.Mock).mockReturnValue({ getAccessTokenSilently: mockGetAccessTokenSilently });
    (useAppState as jest.Mock).mockReturnValue({ updateState: mockUpdateState });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Define test cases
  const testCases = [
    {
      description: 'updates state and localStorage when token is present',
      token: 'fake_token',
      throwError: false,
    },
    {
      description: 'does not update state or localStorage when getAccessTokenSilently throws an error',
      token: null,
      throwError: true,
    },
    {
      description: 'does not update state or localStorage when token is null',
      token: null,
      throwError: false,
    }
  ];

  testCases.forEach(({ description, token, throwError }) => {
    it(`calls getAccessTokenSilently and ${description}`, async () => {
      // Arrange
      throwError 
        ? mockGetAccessTokenSilently.mockRejectedValue(new Error('Error getting token')) 
        : mockGetAccessTokenSilently.mockResolvedValue(token);

      const { result } = renderHook(() => useAuth0Auth());

      // Act
      await act(async () => {
        await result.current.verifyAuth0Token();
      });

      // Assert
      if (token) {
        expect(mockGetAccessTokenSilently).toHaveBeenCalledTimes(1);
        expect(mockUpdateState).toHaveBeenCalledWith({
          auth: { isAuthenticated: true, data: { token } },
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('auth', JSON.stringify({
          isAuthenticated: true,
          data: { token },
        }));
      } else {
        expect(mockUpdateState).not.toHaveBeenCalled();
        expect(localStorage.setItem).not.toHaveBeenCalled();
      }
    });
  });
});
