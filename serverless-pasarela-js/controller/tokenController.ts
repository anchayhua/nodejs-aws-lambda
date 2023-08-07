import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CardToken } from '../models/cardToken';
import { generateRandomToken, validateEmail, validateLuhnAlgorithm } from '../utils';
import { PostgresDatabase, RedisDatabase } from '../database';

const db = new PostgresDatabase();
const redis = new RedisDatabase();

export async function createToken(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const { card_number, cvv, expiration_month, expiration_year, email } = JSON.parse(event.body);

    if (!validateLuhnAlgorithm(card_number) || !validateEmail(email)) {
      throw new Error('Invalid card data or email');
    }

    const token = generateRandomToken(16);
    const cardTokenData: CardToken = {
      token,
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      expiration_timestamp: Date.now() + 15 * 60 * 1000, // 15 minutes expiration
    };

    await db.saveCardToken(cardTokenData);
    await redis.cacheToken(token, JSON.stringify(cardTokenData));

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

export async function getCardData(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    const token = event.queryStringParameters?.token;

    if (!token) {
      throw new Error('Token parameter is required');
    }

    const cachedData = await redis.getCachedToken(token);

    if (!cachedData) {
      throw new Error('Token expired or not found');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        card_number: cachedData.card_number,
        expiration_month: cachedData.expiration_month,
        expiration_year: cachedData.expiration_year,
        email: cachedData.email,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
