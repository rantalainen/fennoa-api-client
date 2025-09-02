import { Helpers } from '../helpers';
import { FennoaApiClient } from '../index';
import { INewCustomer } from '../interfaces/customer.interfaces';
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

  /** Create a new customer. Returns id of the newly created customer. */
  async createCustomer(customer: INewCustomer): Promise<number> {
    const formData = Helpers.convertJsToFormData(customer);

    const result = await super.request('POST', 'add', formData);

    return result.id as number;
  }

  /** Create a new customer using FORM DATA. Returns id of the newly created customer. */
  async createCustomerByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add', formData);

    return result.id as number;
  }

  /** Create a new customer. Returns id of the newly created customer. */
  async createCustomer(customer: INewCustomer): Promise<number> {
    const formData = Helpers.convertJsToFormData(customer);

    const result = await super.request('POST', 'add', formData);

    return result.id as number;
  }

  /** Create a new customer using FORM DATA. Returns id of the newly created customer. */
  async createCustomerByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add', formData);

    return result.id as number;
  }
}
