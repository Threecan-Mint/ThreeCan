import React from 'react'; 
// Import React rendering methods and helper functions from the React Testing Library
import { render, act, waitFor } from '@testing-library/react';

// Import the necessary hooks and functions from your modules
import { useAuthentication } from './useAuthentication';
import { initiateCanvaAuthenticationFlow } from './canvaAuth';
import { useAuth0Auth } from './auth0Auth';
import useAppState from '../../useAppState';

// Import jest for mocking
import { jest } from '@jest/globals';

interface TestCase {
  name: string;
  authState: null | { user: { id: string; name: string; }; tokens: {} };
  canvaAuth: boolean;
  auth0Auth: boolean;
  expectedIsAuthenticating: boolean;
  getExpectedAuthState: (auth0Token?: string) => any;
}

// Mocking
// Mock the Canva authentication function
jest.mock('./canvaAuth', () => ({
  initiateCanvaAuthenticationFlow: jest.fn(),
}));

// Mock the Auth0 authentication hook
jest.mock('./auth0Auth', () => ({
  useAuth0Auth: jest.fn(),
}));

// Mock the app state hook
jest.mock('../../useAppState', () => ({
  useAppState: jest.fn(),
}));

// Define a test component that uses the authentication hook 
// This will be used in our render function to assert against the output of the hook
function TestComponent(props) {
  const auth = useAuthentication();

  // Render two divs containing the results of the hook
  return (
    <div>
      <div>Authenticating: {auth.isAuthenticating.toString()}</div>
      <div>Auth State: {JSON.stringify(auth.authState)}</div>
    </div>
  );
}

// Helper function to set auth state in localStorage
function setAuthStateInLocalStorage(authState) {
  localStorage.setItem('auth', JSON.stringify(authState));
}

// Helper function to clear localStorage
function clearLocalStorage() {
  localStorage.clear();
}

// Begin the test suite for the useAuthentication hook
describe('useAuthentication', () => {
  // Before each test, clear the localStorage to ensure a clean testing environment
  beforeEach(() => {
    clearLocalStorage();
  });

  const testCases: TestCase[] = [
    {
      name: 'when local storage has auth state, should not be authenticating',
      authState: { user: { id: '1', name: 'John Doe' }, tokens: {} },
      canvaAuth: true,
      auth0Auth: true,
      expectedIsAuthenticating: false,
      getExpectedAuthState: (auth0Token) => ({ auth: { isAuthenticated: true, data: { token: auth0Token } } }),
    },
    {
      name: 'when local storage is empty and Canva authentication fails, should not be authenticating',
      authState: null,
      canvaAuth: false,
      auth0Auth: false,
      expectedIsAuthenticating: false,
      getExpectedAuthState: () => ({}),
    },
    {
      name: 'when local storage is empty and Canva authentication succeeds but Auth0 fails, should not be authenticating',
      authState: null,
      canvaAuth: true,
      auth0Auth: false,
      expectedIsAuthenticating: false,
      getExpectedAuthState: () => ({}),
    },
    {
      name: 'when local storage is empty, Canva authentication succeeds and Auth0 authentication succeeds',
      authState: null,
      canvaAuth: true,
      auth0Auth: true,
      expectedIsAuthenticating: false,
      getExpectedAuthState: (auth0Token) => ({ auth: { isAuthenticated: true, data: { token: auth0Token } } }),
    },
    {
      name: 'when local storage is empty, Canva authentication succeeds and Auth0 authentication fails',
      authState: null,
      canvaAuth: true,
      auth0Auth: false,
      expectedIsAuthenticating: false,
      getExpectedAuthState: () => ({}),
    },
  ];

  // For each test case...
  testCases.forEach((testCase) => {
    // Declare the test and its name
    it(testCase.name, async () => {
      // Mock a function to update the state
      const updateState = jest.fn();
      // Mock the return value of useAppState to return the mock function
      (useAppState as jest.Mock).mockReturnValue(
        {updateState,}
      );
      // Mock the return value of useAuth0Auth to simulate verification of the Auth0 token
      const auth0Token = testCase.auth0Auth ? 'auth0Token' : null;
      (useAuth0Auth as jest.Mock).mockReturnValue(
        {verifyAuth0Token: jest.fn().mockResolvedValue(auth0Token)}
      );

      // If the test case has an auth state, set it in the localStorage
      if (testCase.authState) {
        setAuthStateInLocalStorage(testCase.authState);
      }

      // Mock the Canva authentication function to return the canvaAuth property of the test case
      (initiateCanvaAuthenticationFlow as jest.Mock).mockResolvedValue(testCase.canvaAuth);

      // Render the TestComponent
      const { getByText } = render(<TestComponent />);

      // Wait for the authenticating status to match the expected value
      await waitFor(() => getByText(`Authenticating: ${testCase.expectedIsAuthenticating}`));

      // Check that the authentication state matches the expected value
      const expectedAuthState = testCase.getExpectedAuthState(auth0Token);
      expect(getByText(`Auth State: ${JSON.stringify(expectedAuthState)}`)).toBeDefined();
    });
  });
});

