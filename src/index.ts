import got, { Method, OptionsOfJSONResponseBody } from 'got';
import { IFennoaApiClientOptions, IFennoaApiResponse } from './interfaces';

import { AccountingMethods } from './methods/accounting.methods';
import { CustomerMethods } from './methods/customer.methods';
import { DimensionMethods } from './methods/dimension.methods';
import { PurchaseMethods } from './methods/purchase.methods';
import { SaleMethods } from './methods/sale.methods';

export class FennoaApiClient {
  options: IFennoaApiClientOptions;

  readonly accounting: AccountingMethods;
  readonly customers: CustomerMethods;
  readonly dimensions: DimensionMethods;
  readonly sales: SaleMethods;
  readonly purchases: PurchaseMethods;

  constructor(options: IFennoaApiClientOptions) {
    // Set default options
    options.apiBaseUrl = options.apiBaseUrl || 'https://app.fennoa.com/api';
    options.timeout = options.timeout || 120000;

    if (!options.fennoaUser) {
      throw new Error('Missing options.fennoaUser');
    }
    if (!options.fennoaPassword) {
      throw new Error('Missing options.fennoaPassword');
    }

    this.options = options;

    this.accounting = new AccountingMethods(this);
    this.customers = new CustomerMethods(this);
    this.dimensions = new DimensionMethods(this);
    this.sales = new SaleMethods(this);
    this.purchases = new PurchaseMethods(this);
  }

  async request(method: Method, url: string, body?: any, params?: any, headers?: Record<string, string>): Promise<any> {
    const gotOptions: OptionsOfJSONResponseBody = {
      method,
      url,
      username: this.options.fennoaUser,
      password: this.options.fennoaPassword,
      timeout: this.options.timeout,
      throwHttpErrors: false,
      headers: headers || {}
    };

    if (params) {
      gotOptions.searchParams = params;
    }

    if (body) {
      gotOptions.body = body;
    }

    const result: any = await got({ ...gotOptions });
    const parsedResponse: IFennoaApiResponse | any[] = JSON.parse(result.body);

    if (parsedResponse instanceof Array) {
      return {
        status: 'ok',
        data: parsedResponse
      } as IFennoaApiResponse;
    }

    const response: IFennoaApiResponse = parsedResponse;

    if (typeof response?.status === 'string' && response.status.toLowerCase() === 'ok') {
      return response;
    }

    if (typeof response?.errors === 'string') {
      throw new Error(`Fennoa HTTP error ${result.statusCode}: ${response.errors}`);
    } else if (response?.errors instanceof Array) {
      throw new Error(`Fennoa HTTP error ${result.statusCode}: ${response.errors.join(', ')}`);
    } else {
      throw new Error(`Fennoa HTTP error ${result.statusCode}: ${JSON.stringify(response?.errors)}`);
    }
  }

  async requestRaw(method: Method, url: string, body?: any, params?: any, headers?: Record<string, string>): Promise<any> {
    const gotOptions: any = {
      method,
      url,
      username: this.options.fennoaUser,
      password: this.options.fennoaPassword,
      timeout: this.options.timeout,
      throwHttpErrors: false,
      headers: headers || {},
      responseType: 'buffer'
    };

    if (params) {
      gotOptions.searchParams = params;
    }

    if (body) {
      gotOptions.body = body;
    }

    const result: any = await got({ ...gotOptions });

    if (result.statusCode >= 400) {
      throw new Error(`Fennoa HTTP error ${result.statusCode}: ${result.body.toString('utf8')}`);
    }

    return {
      body: result.body,
      headers: result.headers,
      statusCode: result.statusCode
    };
  }
}
