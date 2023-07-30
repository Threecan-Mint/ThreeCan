import { auth as canvaAuth } from "@canva/user";
import { initiateCanvaAuthenticationFlow } from './canvaAuth'; // update this to the actual path

// Mock the Canva auth module
jest.mock('@canva/user', () => ({
  auth: {
    requestAuthentication: jest.fn()
  }
}));

const mockedRequestAuthentication = canvaAuth.requestAuthentication;

describe('initiateCanvaAuthenticationFlow', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Ensures mocks are cleared after each test
  });

  const testCases = [
    {
      description: 'should return true when Canva authentication is successful',
      mockAuthResponse: { status: 'COMPLETED' },
      expectedResult: true,
    },
    {
      description: 'should return false when Canva authentication fails',
      mockAuthResponse: { status: 'DENIED', details: ['failed'] },
      expectedResult: false,
    },
    {
      description: 'should return false when Canva authentication is aborted',
      mockAuthResponse: { status: 'ABORTED' },
      expectedResult: false,
    },
    {
      description: 'should return false when an error occurs',
      mockAuthResponse: new Error('Error occurred'),
      expectedResult: false,
    },
  ];

  testCases.forEach(({ description, mockAuthResponse, expectedResult }) => {
    it(description, async () => {
      // Arrange: Mock the requestAuthentication function
      (mockedRequestAuthentication as jest.Mock).mockImplementation(() => {
        if (mockAuthResponse instanceof Error) {
          throw mockAuthResponse;
        }
        return Promise.resolve(mockAuthResponse);
      });

      // Act: Call the function
      const result = await initiateCanvaAuthenticationFlow();

      // Assert: Check the result
      expect(result).toEqual(expectedResult);
    });
  });
});
