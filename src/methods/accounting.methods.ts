import * as FormData from 'form-data';

import { IFennoaApiResponse } from '../interfaces';
import {
  AccountingAccount,
  AccountingAccountBalance,
  AccountingBudget,
  AccountingBudgetInput,
  AccountingLedgerFilters,
  AccountingLedgerRow,
  AccountingLockingPeriod,
  AccountingOpeningBalance,
  AccountingPeriod,
  AccountingVatCode,
  IAccountingDimensionFilters,
  INewAccountingStatement,
  INewAccountingStatementRow,
  PaginatedAccountingLedgerResponse
} from '../interfaces/accounting.interfaces';
import { FennoaApiClient } from '../index';
import { Methods } from '../methods';

export class AccountingMethods extends Methods {
  constructor(fennoa: FennoaApiClient) {
    super(fennoa, 'accounting_api');
  }

  /** Create a new accounting statement using FORM DATA generated from a JavaScript object. Returns id of the newly created statement. */
  async createStatement(statement: INewAccountingStatement): Promise<number> {
    this.validateStatement(statement);

    const formData = this.createStatementFormData(statement);

    return await this.createStatementByFormData(formData);
  }

  /** Create a new accounting statement using FORM DATA. Returns id of the newly created statement. */
  async createStatementByFormData(formData: FormData): Promise<number> {
    const result = await super.request('POST', 'add', formData, undefined, formData.getHeaders() as Record<string, string>);

    if (typeof result?.id !== 'number') {
      throw new Error('Fennoa error: Failed to create accounting statement');
    }

    return result.id;
  }

  /** Upload an attachment to an accounting statement. */
  async uploadAttachment(
    statementId: number,
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

    await this.uploadAttachmentByFormData(statementId, formData);
  }

  /** Upload an attachment to an accounting statement using prebuilt form data. */
  async uploadAttachmentByFormData(statementId: number, formData: FormData): Promise<void> {
    await super.request(
      'POST',
      `do/upload_attachment/${statementId}`,
      formData,
      undefined,
      formData.getHeaders() as Record<string, string>
    );
  }

  /** Fetch the balance of a given account and date. */
  async getAccountBalance(account: number, date: string, dimensions?: IAccountingDimensionFilters): Promise<AccountingAccountBalance> {
    const endpoint = `get/account_balance/${account}/${date}${this.buildDimensionSegments(dimensions)}`;
    const result = await super.request('GET', endpoint);

    return this.extractResult<AccountingAccountBalance>(result);
  }

  /** Fetch a ledger report. */
  async getLedger(
    startDate: string,
    endDate: string,
    filters?: AccountingLedgerFilters
  ): Promise<AccountingLedgerRow[] | PaginatedAccountingLedgerResponse> {
    const endpoint = `get/ledger/${startDate}/${endDate}${this.buildFilterSegments(filters)}`;
    const params = this.buildLedgerPaginationParams(filters);
    const result = await super.request('GET', endpoint, undefined, params);
    const rootResult = this.extractRootResult<PaginatedAccountingLedgerResponse>(result);

    if (
      typeof rootResult.limit === 'number' &&
      typeof rootResult.page === 'number' &&
      typeof rootResult.itemsCount === 'number' &&
      typeof rootResult.pagesCount === 'number' &&
      typeof rootResult.totalCount === 'number'
    ) {
      return rootResult;
    }

    return this.extractResult<AccountingLedgerRow[]>(result);
  }

  /** Fetch a list of accounts. */
  async getAccounts(accounts?: Array<number | string>): Promise<AccountingAccount[]> {
    const endpoint = accounts && accounts.length > 0 ? `get/accounts/${accounts.join(',')}` : 'get/accounts';
    const result = await super.request('GET', endpoint);

    return this.extractResult<AccountingAccount[]>(result);
  }

  /** Fetch a list of VAT codes. */
  async getVatCodes(): Promise<AccountingVatCode[]> {
    const result = await super.request('GET', 'get/vatcodes');

    return this.extractResult<AccountingVatCode[]>(result);
  }

  /** Fetch a list of accounting periods. */
  async getPeriods(): Promise<AccountingPeriod[]> {
    const result = await super.request('GET', 'get/periods');

    return this.extractResult<AccountingPeriod[]>(result);
  }

  /** Fetch opening balances for a given accounting period. */
  async getOpeningBalances(periodId: number, accounts?: Array<number | string>): Promise<AccountingOpeningBalance[]> {
    let endpoint = `get/opening_balances/${periodId}`;

    if (accounts && accounts.length > 0) {
      endpoint += `/accounts:${accounts.join(',')}`;
    }

    const result = await super.request('GET', endpoint);

    return this.extractResult<AccountingOpeningBalance[]>(result);
  }

  /** Fetch locking dates for accounting, sales and purchases. */
  async getLockingPeriods(): Promise<AccountingLockingPeriod[]> {
    const result = await super.request('GET', 'get/locking_periods');

    return this.extractResult<AccountingLockingPeriod[]>(result);
  }

  /** Create a new budget. Returns id of the newly created budget. */
  async createBudget(budget: AccountingBudgetInput): Promise<number> {
    const headers = {
      'Content-Type': 'application/json'
    };

    const result = await super.request('POST', 'add/budgets', JSON.stringify(budget), undefined, headers);

    if (typeof result?.id !== 'number') {
      throw new Error('Fennoa error: Failed to create budget');
    }

    return result.id;
  }

  /** Patch an existing budget. */
  async patchBudget(budgetId: number, budget: AccountingBudgetInput): Promise<AccountingBudget> {
    const headers = {
      'Content-Type': 'application/json'
    };

    const result = await super.request('PATCH', `budgets/${budgetId}`, JSON.stringify(budget), undefined, headers);

    return this.extractResult<AccountingBudget>(result);
  }

  /** Fetch budgets and optionally filter them by accounting period id. */
  async getBudgets(accountingPeriodId?: number): Promise<AccountingBudget[]> {
    const params = new URLSearchParams();

    if (typeof accountingPeriodId === 'number') {
      params.append('accountingPeriodId', accountingPeriodId.toString());
    }

    const result = await super.request('GET', 'get/budgets', undefined, params);

    return this.extractResult<AccountingBudget[]>(result);
  }

  private buildFilterSegments(filters?: AccountingLedgerFilters): string {
    if (!filters) {
      return '';
    }

    let segments = '';

    if (filters.accounts && filters.accounts.length > 0) {
      segments += `/accounts:${filters.accounts.join(',')}`;
    }

    segments += this.buildDimensionSegments(filters.dimensions);

    if (typeof filters.series === 'number') {
      segments += `/series:${filters.series}`;
    }

    return segments;
  }

  private buildDimensionSegments(dimensions?: IAccountingDimensionFilters): string {
    if (!dimensions) {
      return '';
    }

    let segments = '';

    for (const dimensionTypeId in dimensions) {
      if (!Object.prototype.hasOwnProperty.call(dimensions, dimensionTypeId)) {
        continue;
      }

      segments += `/dim${dimensionTypeId}:${dimensions[Number(dimensionTypeId)]}`;
    }

    return segments;
  }

  private buildLedgerPaginationParams(filters?: AccountingLedgerFilters): URLSearchParams | undefined {
    if (!filters) {
      return undefined;
    }

    if (
      (typeof filters.page === 'number' && typeof filters.limit !== 'number') ||
      (typeof filters.page !== 'number' && typeof filters.limit === 'number')
    ) {
      throw new Error('Ledger pagination requires both page and limit.');
    }

    if (typeof filters.limit === 'number' && (filters.limit < 1 || filters.limit > 500)) {
      throw new Error('Ledger limit must be between 1 and 500.');
    }

    if (typeof filters.page === 'number' && filters.page < 1) {
      throw new Error('Ledger page must be at least 1.');
    }

    if (typeof filters.page !== 'number' || typeof filters.limit !== 'number') {
      return undefined;
    }

    const params = new URLSearchParams();

    params.append('page', filters.page.toString());
    params.append('limit', filters.limit.toString());

    return params;
  }

  private createStatementFormData(statement: INewAccountingStatement): FormData {
    const formData = new FormData();

    this.appendFormValue(formData, 'entry_date', statement.entry_date);
    this.appendFormValue(formData, 'statement_series_code', statement.statement_series_code);
    this.appendFormValue(formData, 'description', statement.description);
    this.appendFormValue(formData, 'purchase_invoice_id', statement.purchase_invoice_id);

    statement.row.forEach((row: INewAccountingStatementRow, index: number) => {
      const rowIndex = index + 1;

      for (const key in row) {
        if (!Object.prototype.hasOwnProperty.call(row, key)) {
          continue;
        }

        this.appendFormValue(formData, `row[${rowIndex}][${key}]`, row[key as keyof INewAccountingStatementRow]);
      }
    });

    return formData;
  }

  private appendFormValue(formData: FormData, key: string, value?: string | number): void {
    if (value === undefined || value === null) {
      return;
    }

    formData.append(key, value.toString());
  }

  private validateStatement(statement: INewAccountingStatement): void {
    if (!statement.row || statement.row.length < 2) {
      throw new Error('Accounting statement must contain at least two rows.');
    }

    if (statement.purchase_invoice_id && statement.statement_series_code && statement.statement_series_code !== 'PU') {
      throw new Error('statement_series_code must be PU when purchase_invoice_id is provided.');
    }

    if (statement.statement_series_code === 'PU' && !statement.purchase_invoice_id) {
      throw new Error('purchase_invoice_id is required when statement_series_code is PU.');
    }

    let debitTotal = 0;
    let creditTotal = 0;

    statement.row.forEach((row: INewAccountingStatementRow, index: number) => {
      const rowNumber = index + 1;
      const hasDebit = typeof row.debit === 'number';
      const hasCredit = typeof row.credit === 'number';

      if (!hasDebit && !hasCredit) {
        throw new Error(`Accounting statement row ${rowNumber} must have either debit or credit.`);
      }

      if (hasDebit && hasCredit) {
        throw new Error(`Accounting statement row ${rowNumber} cannot have both debit and credit.`);
      }

      if (typeof row.debit === 'number' && row.debit < 0) {
        throw new Error(`Accounting statement row ${rowNumber} debit cannot be negative.`);
      }

      if (typeof row.credit === 'number' && row.credit < 0) {
        throw new Error(`Accounting statement row ${rowNumber} credit cannot be negative.`);
      }

      debitTotal += row.debit || 0;
      creditTotal += row.credit || 0;
    });

    if (Math.abs(debitTotal - creditTotal) > 0.001) {
      throw new Error('Accounting statement debit and credit totals must match.');
    }
  }

  private extractResult<T>(result: IFennoaApiResponse): T {
    if (typeof result?.data !== 'undefined') {
      return result.data as T;
    }

    return this.extractRootResult<T>(result);
  }

  private extractRootResult<T>(result: IFennoaApiResponse): T {
    const responseWithUnknownKeys = result as IFennoaApiResponse & Record<string, unknown>;
    const rootResult: Record<string, unknown> = {};

    for (const key in responseWithUnknownKeys) {
      if (!Object.prototype.hasOwnProperty.call(responseWithUnknownKeys, key) || key === 'status' || key === 'errors') {
        continue;
      }

      rootResult[key] = responseWithUnknownKeys[key];
    }

    return rootResult as T;
  }
}
