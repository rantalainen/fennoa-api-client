import { FennoaApiClient } from '../index';
import { Methods } from '../methods';
import { Helpers } from '../helpers';
import { INewSalesInvoice } from '../interfaces/sale.interfaces';
import * as FormData from 'form-data';

export class SaleMethods extends Methods {
  constructor(fennoa: FennoaApiClient) {
    super(fennoa, 'sales_api');
  }

  /** Fetch all sales invoices. Returns array of sales invoices. */
  async getAll(): Promise<any> {
    return await super.getAll();
  }

  /** Get all the information about single sales invoice, including delivery and payment informations. */
  async getById(id: number): Promise<any> {
    return await super.getById(id);
  }

  /** Create a new sales invoice. Returns id of the newly created invoice. */
  async createInvoice(salesInvoice: INewSalesInvoice): Promise<number> {
    const formData = Helpers.convertJsToFormData(salesInvoice);

    const result = await super.request('POST', 'add', formData);

    return result.id as number;
  }

  /** Create a new sales invoice using FORM DATA. Returns id of the newly created invoice. */
  async createInvoiceByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add', formData);

    return result.id as number;
  }

  /** Create a new sales invoice from Finvoice XML data. Returns id of the newly created invoice. */
  async createInvoiceByFinvoiceXML(xml: string): Promise<number> {
    const result = await super.request('POST', 'add/finvoice', xml);

    return result.id as number;
  }

  /** Approve an existing sales invoice in Fennoa. Approving an invoice reserves an invoice number and creates accounting statements.
   * It also allows sending it to the customer. Before approving the invoice is considered as a `draft`. */
  async approveInvoice(id: number): Promise<void> {
    await super.request('POST', `do/approve/${id}`);
  }

  /** Send an invoice to a customer. Only approved invoices can be sent. Invoice will be sent using the delivery method and address specified in the invoice data. */
  async sendInvoice(id: number): Promise<void> {
    const result = await super.request('POST', `do/send/${id}`);

    if (result?.data === 'failed') {
      throw new Error('Fennoa error: Sending invoice failed');
    }
  }
}
