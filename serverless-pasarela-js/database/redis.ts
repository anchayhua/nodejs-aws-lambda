import { Client } from 'pg';
import { CardToken } from '../models/cardToken';

export class RedisDatabase {
  private client: Client;

  constructor() {
    this.client = new Client({
      user: 'your-db-user',
      host: 'your-db-host',
      database: 'your-db-name',
      password: 'your-db-password',
      port: 5432, // Adjust the port as needed
    });

    this.client.connect();
  }

  async saveCardToken(data: CardToken): Promise<void> {
    const query = `
      INSERT INTO card_tokens (token, card_number, cvv, expiration_month, expiration_year, email, expiration_timestamp)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      data.token,
      data.card_number,
      data.cvv,
      data.expiration_month,
      data.expiration_year,
      data.email,
      data.expiration_timestamp,
    ];

    await this.client.query(query, values);
  }
}
