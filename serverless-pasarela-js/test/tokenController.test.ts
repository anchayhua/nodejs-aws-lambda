import { createToken, getCardData } from '../src/controller/tokenController';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { describe, beforeEach, afterEach, test } from '@jest/globals';
import mockContext from 'aws-lambda-mock-context';
import AWSMock from 'aws-sdk-mock';

describe('Token Controller', () => {

  beforeEach(() => {
    AWSMock.setSDKInstance(require('aws-sdk'));
    AWSMock.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
      callback(null, {});
    });

    // Mock other AWS services or database interactions as needed
  });

  afterEach(() => {
    AWSMock.restore();
  });

  test('createToken should return a valid response', async () => {
    // Definir los datos de la tarjeta para la prueba
    const cardData = {
      card_number: 'valid-card-number',
      cvv: '123',
      expiration_month: 8,
      expiration_year: 2023,
      email: 'test@example.com',
    };
  
    // Crear el objeto event con los datos de la tarjeta
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify(cardData),
      // Otras propiedades necesarias pueden ser añadidas aquí
    };
  
    // Simular el contexto con aws-lambda-mock-context
    const context = mockContext();
  
    // Ejecutar la función createToken con los datos de la tarjeta
    const result: APIGatewayProxyResult = await createToken(event);
  
    // Realizar afirmaciones sobre el resultado
  });

  test('getCardData should return a valid response', async () => {
    const event: APIGatewayProxyEvent = {
      queryStringParameters: {
        token: 'mocked-token',
      },
      // Provide other necessary properties
    };
    const context = mockContext();

    const result: APIGatewayProxyResult = await getCardData(event);

    // Perform assertions on the result
  });
});
