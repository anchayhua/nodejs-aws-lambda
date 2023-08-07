import { createToken, getCardData } from '../controller/tokenController';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import mockContext from 'aws-lambda-mock-context';
import AWSMock from 'aws-sdk-mock';

// Esto permite que TypeScript reconozca la función describe de Jest
declare var describe: any;

describe('Token Controller', () => {
  beforeEach(() => {
    AWSMock.mock('DynamoDB', 'putItem', (params, callback) => {
      callback(null, 'successfully put item in database');
    });

    // Mock other AWS services or database interactions as needed
  });

  afterEach(() => {
    AWSMock.restore();
  });

  test('createToken should return a valid response', async () => {
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify({
        card_number: 'valid-card-number',
        cvv: '123',
        expiration_month: 8,
        expiration_year: 2023,
        email: 'test@example.com',
      }),
      // Provide other necessary properties
    };
    const context = mockContext();

    const result: APIGatewayProxyResult = await createToken(event, context);

    // Perform assertions on the result
  });

  test('getCardData should return a valid response', async () => {
    const event: APIGatewayProxyEvent = {
      queryStringParameters: {
        token: 'mocked-token',
      },
      // Provide other necessary properties
    };
    const context = mockContext();

    const result: APIGatewayProxyResult = await getCardData(event, context);

    // Perform assertions on the result
  });
});
