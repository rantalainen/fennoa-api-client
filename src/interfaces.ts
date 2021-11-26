export interface IFennoaApiClientOptions {
  /** Fennoa user (selected company identifier) for authentication */
  fennoaUser: string;
  /** Fennoa password (api key) for authentication */
  fennoaPassword: string;

  /** API base url, `https://app.fennoa.com/api` by default */
  apiBaseUrl?: string;

  /** Request timeout, defaults to 120000 (120 secs) */
  timeout?: number;
}

export interface IFennoaApiResponse {
  status: 'ok' | 'error';
  data?: any;
  errors?: any;
  id?: number;
}
