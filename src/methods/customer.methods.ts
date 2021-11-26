import { FennoaApiClient } from '../index';
import { Methods } from '../methods';

export class CustomerMethods extends Methods {
  constructor(fennoa: FennoaApiClient) {
    super(fennoa, 'customer_api');
  }

  /** Fetch all customers. Returns array of customers. */
  async getAll(): Promise<any> {
    return await super.getAll();
  }

  /** Get all the information about single customer. */
  async getById(id: number): Promise<any> {
    return await super.getById(id);
  }
}
