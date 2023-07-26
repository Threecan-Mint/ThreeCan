import { renderHook, act } from '@testing-library/react';
import useAppState from './useAppState';

// Define the default state
const defaultState = {
  isLoading: false,
  exportData: null,
  responseData: null,
  walletAddress: null,
  auth: { isAuthenticated: false, data: {} },
};
describe('useAppState', () => {
  const testCases = [
    {
      description: 'should initialize with the correct default state',
      initialActions: [],
      updates: [],
      finalState: defaultState,
    },
    {
      description: 'should update the isLoading state correctly when updateState is called',
      initialActions: [],
      updates: [{ isLoading: true }],
      finalState: { ...defaultState, isLoading: true },
    },
    {
      description: 'should update the auth state correctly when updateState is called',
      initialActions: [result => result.updateState({ isLoading: true })],
      updates: [{ auth: { isAuthenticated: true, data: { token: 'fake_token' } } }],
      finalState: { ...defaultState, isLoading: true, auth: { isAuthenticated: true, data: { token: 'fake_token' } } },
    },
    {
      description: 'should update the walletAddress state correctly when updateState is called',
      initialActions: [],
      updates: [{ walletAddress: '0xabc' }],
      finalState: { ...defaultState, walletAddress: '0xabc' },
    },
    {
      description: 'should update multiple properties of the state correctly when updateState is called',
      initialActions: [result => result.updateState({ isLoading: true })],
      updates: [{ walletAddress: '0xabc', auth: { isAuthenticated: true, data: { token: 'fake_token' } } }],
      finalState: { ...defaultState, isLoading: true, walletAddress: '0xabc', auth: { isAuthenticated: true, data: { token: 'fake_token' } } },
    },
    {
      description: 'should reset to the default state when updateState is called with the default state',
      initialActions: [result => result.updateState({ isLoading: true, walletAddress: '0xabc', auth: { isAuthenticated: true, data: { token: 'fake_token' } } })],
      updates: [defaultState],
      finalState: defaultState,
    },
  ];

  testCases.forEach(({ description, initialActions, updates, finalState }) => {
    it(description, () => {
      const { result } = renderHook(() => useAppState());

      // Perform initial actions
      initialActions.forEach(action => {
        act(() => {
          action(result.current);
        });
      });

      // Apply updates
      updates.forEach(update => {
        act(() => {
          result.current.updateState(update);
        });

        // Assert updated state
        expect(result.current.state).toEqual({ ...result.current.state, ...update });
      });

      // Assert final state after all updates
      expect(result.current.state).toEqual(finalState);
    });
  });
});