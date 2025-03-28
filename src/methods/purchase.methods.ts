import { FennoaApiClient } from '../index';
import { Methods } from '../methods';
import {
  ApprovalQueueResponse,
  SinglePurchaseInvoiceResponse,
  ApprovePurchaseInvoiceResponse,
  PurchaseInvoicePaymentInfo,
  AddPaymentResponse
} from '../interfaces/purchase.interfaces';

export class PurchaseMethods extends Methods {
  constructor(fennoa: FennoaApiClient) {
    super(fennoa, 'purchases_api');
  }

  /** Gets the approval queue for API user */
  async getApprovalQueue(options?: { page?: number; modifiedAfter?: string }): Promise<ApprovalQueueResponse> {
    let endpoint = 'get/approval_queue';

    if (options?.page) {
      endpoint += `/${options.page}`;
    }

    const params = new URLSearchParams();

    if (options?.modifiedAfter) {
      params.append('modifiedAfter', options.modifiedAfter);
    }

    const queryString = params.toString();

    if (queryString) {
      endpoint += `?${queryString}`;
    }

    const result = await super.request('GET', endpoint);

    return result.data;
  }

  /** Get all the information about single purchase invoice */
  async getPurchaseInvoiceById(id: number): Promise<SinglePurchaseInvoiceResponse> {
    const result = await super.request('GET', `${id}`);

    return result.data;
  }

  /** Approve a purchase invoice approval */
  async approvePurchaseInvoice(approvalId: number, comment?: string): Promise<ApprovePurchaseInvoiceResponse> {
    if (comment && comment.length > 200) {
      throw new Error('Approval comment must be 200 characters or less.');
    }

    let endpoint = `do/approve/${approvalId}`;

    if (comment) {
      const encodedComment = encodeURIComponent(comment);
      endpoint += `/${encodedComment}`;
    }

    const result = await super.request('POST', endpoint);

    return result.data;
  }

  /** Create a payment to purchase invoice using JSON. Needs accountant rights. */
  async addPurchasePayment(paymentInfo: PurchaseInvoicePaymentInfo): Promise<AddPaymentResponse> {
    const headers = {
      'Content-Type': 'application/json'
    };

    const result = await super.request('POST', 'do/add_payment', JSON.stringify(paymentInfo), undefined, headers);

    return result.data;
  }
}
