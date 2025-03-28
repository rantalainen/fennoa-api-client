import { FennoaApiClient } from './index';
import { IFennoaApiResponse } from './interfaces';
import { Method } from 'got';

export class Methods {
  /** @private */
  _fennoa: any;

  /** @private */
  _selectedApi: string;

  constructor(fennoa: FennoaApiClient, selectedApi: string) {
    if (!fennoa || typeof fennoa !== 'object') {
      throw new Error('Incorrect or missing fennoa in method initialization');
    }

    if (!selectedApi || typeof selectedApi !== 'string') {
      throw new Error('Incorrect or missing selectedApi in method initialization');
    }

    this._fennoa = () => fennoa;

    this._selectedApi = selectedApi;
  }

  async request(method: Method, uri: string, body?: any, params?: any, headers?: Record<string, string>): Promise<IFennoaApiResponse> {
    return await this._fennoa().request(method, `${this._fennoa().options.apiBaseUrl}/${this._selectedApi}/${uri}`, body, params, headers);
  }

  async getAll(): Promise<any> {
    const result = await this.request('GET', '');

    return result.data;
  }

  async getById(resourceId: number): Promise<any> {
    const result = await this.request('GET', `${resourceId}`);

    return result.data;
  }
}
