import { Helpers } from '../helpers';
import { FennoaApiClient } from '../index';
import { INewCustomer, IUpdateCustomer } from '../interfaces/customer.interfaces';
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

  /** Get customer by customer number. E.g. /customer_api/get/customer_no/F123. */
  async getByCustomerNo(customerNo: string): Promise<any> {
    return await super.request('GET', `get/customer_no/${customerNo}`);
  }

  /** Create a new customer. Returns id of the newly created customer. */
  async createCustomer(customer: INewCustomer): Promise<string> {
    const formData = Helpers.convertJsToFormData(customer);

    const result = await super.request('POST', 'add', formData);

    if (result?.status !== 'ok' || !result?.data?.Customer) {
      throw new Error('Fennoa error: Failed to create customer');
    }

    return result.data.Customer.id;
  }

  /** Create a new customer using FORM DATA. Returns id of the newly created customer. */
  async createCustomerByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add', formData);

    if (result?.status !== 'ok' || !result?.data?.Customer) {
      throw new Error('Fennoa error: Failed to create customer');
    }

    return result.data.Customer.id;
  }

  /** Update customer. Returns id of the updated customer. */
  async updateCustomer(customerNo: string, customer: IUpdateCustomer): Promise<string> {
    const headers = {
      'Content-Type': 'application/json'
    };

    const result = await super.request('PUT', customerNo, JSON.stringify(customer), undefined, headers);

    if (result?.status !== 'ok' || !result?.data?.id) {
      throw new Error('Fennoa error: Failed to update customer');
    }

    return result.data.id;
  }
}
