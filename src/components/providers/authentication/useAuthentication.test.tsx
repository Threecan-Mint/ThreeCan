// import { renderHook, act } from '@testing-library/react';
// import { initiateCanvaAuthenticationFlow } from './canvaAuth';
// import { useAuth0Auth } from './auth0Auth';
// import useAppState from '../../useAppState';
// import { useAuthentication } from './useAuthentication';

// // Mock the dependencies
// jest.mock('./canvaAuth');
// jest.mock('./auth0Auth');
// jest.mock('../../useAppState');

// // Mock the localStorage
// const mockLocalStorage = {
//   length: 0,
//   getItem: jest.fn(),
//   setItem: jest.fn(),
//   clear: jest.fn(),
//   removeItem: jest.fn(),
//   key: jest.fn()
// };
// global.localStorage = mockLocalStorage;

// describe('useAuthentication', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//     jest.useFakeTimers();
//   });

//   afterEach(() => {
//     jest.runOnlyPendingTimers();
//     jest.useRealTimers();
//   });

//   const testCases = [
//     {
//       description: 'should authenticate with local storage data',
//       localStorageData: { token: 'mock-token', user: 'mock-user' },
//       isAuthenticating: false
//     },
//     {
//       description: 'should authenticate with Canva and Auth0 when no local storage data',
//       localStorageData: null,
//       canvaAuth: true,
//       isAuthenticating: false
//     },
//     {
//       description: 'should not authenticate with Auth0 when Canva authentication fails',
//       localStorageData: null,
//       canvaAuth: false,
//       isAuthenticating: false
//     }
//   ];

//   testCases.forEach(({ description, localStorageData, canvaAuth, isAuthenticating }) => {
//     it(description, () => {
//       const mockUpdateState = jest.fn();
//       const mockVerifyAuth0Token = jest.fn();

//       (useAppState as jest.Mock).mockReturnValue({
//         updateState: mockUpdateState
//       });

//       (useAuth0Auth as jest.Mock).mockReturnValue({
//         verifyAuth0Token: mockVerifyAuth0Token
//       });

//       (initiateCanvaAuthenticationFlow as jest.Mock).mockResolvedValue(canvaAuth);

//       mockLocalStorage.getItem.mockReturnValue(localStorageData ? JSON.stringify(localStorageData) : null);

//       const { result } = renderHook(() => useAuthentication());

//       // Arrange
//       expect(result.current.isAuthenticating).toBe(true);

//       // Act
//       act(() => {
//         jest.runAllTimers();
//       });

//       // Assert
//       expect(result.current.isAuthenticating).toBe(isAuthenticating);
//       if (localStorageData) {
//         expect(mockUpdateState).toHaveBeenCalledWith({ auth: localStorageData });
//       } else if (canvaAuth) {
//         expect(mockVerifyAuth0Token).toHaveBeenCalled();
//       } else {
//         expect(mockVerifyAuth0Token).not.toHaveBeenCalled();
//       }
//     });
//   });
// });
