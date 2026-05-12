import { FennoaApiClient } from '../index';
import { Methods } from '../methods';
import { Helpers } from '../helpers';
import {
  INewSalesInvoice,
  SalesInvoiceDeliveryError,
  SalesInvoiceDueDatePatch,
  SalesInvoicePaymentInfo,
  SalesInvoicePaymentListItem,
  SalesInvoicePdfResponse,
  SalesInvoiceResponse,
  SalesInvoiceSendOptions
} from '../interfaces/sale.interfaces';
import FormData = require('form-data');

export class SaleMethods extends Methods {
  constructor(fennoa: FennoaApiClient) {
    super(fennoa, 'sales_api');
  }

  /** Fetch all sales invoices. Returns array of sales invoices. */
  async getAll(page?: number): Promise<any> {
    const params = new URLSearchParams();

    if (typeof page === 'number') {
      params.append('page', page.toString());
    }

    const result = await super.request('GET', '', undefined, params);

    return result.data;
  }

  /** Get all the information about single sales invoice, including delivery and payment informations. */
  async getById(id: number): Promise<SalesInvoiceResponse> {
    return (await super.getById(id)) as SalesInvoiceResponse;
  }

  /** Get all the information about single sales invoice using invoice number. */
  async getByInvoiceNo(invoiceNo: number | string): Promise<SalesInvoiceResponse> {
    const result = await super.request('GET', `get/invoice_no/${invoiceNo}`);

    return result.data as SalesInvoiceResponse;
  }

  /** Create a new sales invoice. Returns id of the newly created invoice. */
  async createInvoice(salesInvoice: INewSalesInvoice): Promise<number> {
    const formData = Helpers.convertJsToFormData(salesInvoice);

    const result = await super.request('POST', 'add', formData, undefined, formData.getHeaders() as Record<string, string>);

    return result.id as number;
  }

  /** Create a new sales invoice using FORM DATA. Returns id of the newly created invoice. */
  async createInvoiceByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add', formData, undefined, formData.getHeaders() as Record<string, string>);

    return result.id as number;
  }

  /** Create a new sales invoice from Finvoice XML data. Returns id of the newly created invoice. */
  async createInvoiceByFinvoiceXML(xml: string): Promise<number> {
    const formData = new FormData();
    formData.append('finvoice', xml);

    const result = await super.request('POST', 'add/finvoice', formData, undefined, formData.getHeaders() as Record<string, string>);

    return result.id as number;
  }

  /** Upload an attachment to a sales invoice. PDF is recommended. */
  async uploadAttachment(
    invoiceId: number,
    file: any,
    options?: { filename?: string; contentType?: string; knownLength?: number }
  ): Promise<void> {
    const formData = new FormData();
    const appendOptions: Record<string, string | number> = {};

    if (options?.filename) {
      appendOptions.filename = options.filename;
    }

    if (options?.contentType) {
      appendOptions.contentType = options.contentType;
    }

    if (typeof options?.knownLength === 'number') {
      appendOptions.knownLength = options.knownLength;
    }

    if (appendOptions.filename || appendOptions.contentType || appendOptions.knownLength) {
      formData.append('file', file, appendOptions as any);
    } else {
      formData.append('file', file);
    }

    await this.uploadAttachmentByFormData(invoiceId, formData);
  }

  /** Upload an attachment to a sales invoice using prebuilt form data. */
  async uploadAttachmentByFormData(invoiceId: number, formData: FormData): Promise<void> {
    await super.request('POST', `do/upload_attachment/${invoiceId}`, formData, undefined, formData.getHeaders() as Record<string, string>);
  }

  /** Approve an existing sales invoice in Fennoa. Approving an invoice reserves an invoice number and creates accounting statements.
   * It also allows sending it to the customer. Before approving the invoice is considered as a `draft`. */
  async approveInvoice(id: number): Promise<void> {
    await super.request('POST', `do/approve/${id}`);
  }

  /** Send an invoice to a customer. Only approved invoices can be sent. Invoice will be sent using the delivery method and address specified in the invoice data. */
  async sendInvoice(id: number, options?: SalesInvoiceSendOptions): Promise<void> {
    let result;

    if (options && Object.keys(options).length > 0) {
      const headers = {
        'Content-Type': 'application/json'
      };

      result = await super.request('POST', `do/send/${id}`, JSON.stringify(options), undefined, headers);
    } else {
      result = await super.request('POST', `do/send/${id}`);
    }

    if (result?.data === 'failed') {
      throw new Error('Fennoa error: Sending invoice failed');
    }
  }

  /** Update the due date of an existing sales invoice. */
  async patchInvoiceDueDate(id: number, dueDate: string | SalesInvoiceDueDatePatch): Promise<void> {
    const headers = {
      'Content-Type': 'application/json'
    };
    const payload = typeof dueDate === 'string' ? { due_date: dueDate } : dueDate;

    await super.request('PATCH', `sales_invoice/${id}`, JSON.stringify(payload), undefined, headers);
  }

  /** Create a new sales invoice payment. */
  async addPayment(payment: SalesInvoicePaymentInfo): Promise<void> {
    const headers = {
      'Content-Type': 'application/json'
    };

    await super.request('POST', 'add/payment', JSON.stringify(payment), undefined, headers);
  }

  /** Fetch sales invoice payments between two dates, optionally filtered by creation date. */
  async getPayments(fromDate: string, toDate: string, createdAfter?: string): Promise<SalesInvoicePaymentListItem[]> {
    let endpoint = `get/payments/${fromDate}/${toDate}`;

    if (createdAfter) {
      endpoint += `/created_after:${createdAfter}`;
    }

    const result = await super.request('GET', endpoint);

    return this.extractListResult<SalesInvoicePaymentListItem>(result.data);
  }

  /** Fetch invoice delivery errors. */
  async getDeliveryErrors(): Promise<SalesInvoiceDeliveryError[]> {
    const result = await super.request('GET', 'get/delivery_errors');
    const data = result.data;

    if (data?.SalesInvoiceDelivery instanceof Array) {
      return data.SalesInvoiceDelivery as SalesInvoiceDeliveryError[];
    }

    if (data?.SalesInvoiceDelivery) {
      return [data.SalesInvoiceDelivery as SalesInvoiceDeliveryError];
    }

    return this.extractListResult<SalesInvoiceDeliveryError>(data);
  }

  /** Fetch a sales invoice PDF. */
  async getPdf(id: number): Promise<SalesInvoicePdfResponse> {
    const result = await super.requestRaw('GET', `get/pdf/${id}`);
    const contentDisposition = result.headers['content-disposition'];
    const filenameMatch = typeof contentDisposition === 'string' ? /filename="?([^";]+)"?/i.exec(contentDisposition) : null;

    return {
      body: result.body as Buffer,
      filename: filenameMatch ? filenameMatch[1] : undefined,
      contentType: typeof result.headers['content-type'] === 'string' ? result.headers['content-type'] : undefined,
      headers: result.headers as Record<string, unknown>
    };
  }

  private extractListResult<T>(data: any): T[] {
    if (data instanceof Array) {
      return data as T[];
    }

    if (!data) {
      return [];
    }

    return [data as T];
  }
}
