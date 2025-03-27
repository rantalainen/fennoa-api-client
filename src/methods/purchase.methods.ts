import { FennoaApiClient } from '../index';
import { Methods } from '../methods';

export class PurchaseMethods extends Methods {
  constructor(fennoa: FennoaApiClient) {
    super(fennoa, 'purchases_api');
  }

  /** Gets the approval queue for API user */
  async getApprovalQueue(): Promise<any> {
    const result = await super.request('GET', 'get/approval_queue');

    return result.data;
  }
}
