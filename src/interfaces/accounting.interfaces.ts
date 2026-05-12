export type AccountingStatementSeriesCode = 'CA' | 'GL' | 'GL2' | 'GL3' | 'GL4' | 'GL5' | 'GL6' | 'PU';

export interface IAccountingDimensionFilters {
  [dimensionTypeId: number]: string | number;
}

export interface INewAccountingStatementRow {
  debit?: number;
  credit?: number;
  account: number;
  description?: string;
  vatcode?: number;
  accrual_start?: string;
  accrual_count?: number;
  [dimensionKey: `dim_${number}`]: string | number | undefined;
}

export interface INewAccountingStatement {
  entry_date?: string;
  statement_series_code?: AccountingStatementSeriesCode;
  description?: string;
  purchase_invoice_id?: number;
  row: INewAccountingStatementRow[];
}

export interface AccountingAccountBalance {
  account?: number | string;
  date?: string;
  dimensions?: any[];
  sum_debit: number | string;
  sum_credit: number | string;
  sum_total?: number | string;
}

export interface AccountingLedgerFilters {
  accounts?: Array<number | string>;
  dimensions?: IAccountingDimensionFilters;
  series?: number;
  page?: number;
  limit?: number;
}

export interface AccountingLedgerRow {
  statement_id: number | string;
  account: number | string;
  date: string;
  debit: number | string;
  credit: number | string;
  vatcode_id?: number | string;
  description?: string;
  series?: string;
  number?: number;
  opening?: number | string;
  closing?: number | string;
  dimensions?: any[];
  type?: string;
  id?: number;
  url?: string;
  links?: any[];
}

export interface PaginatedAccountingLedgerResponse {
  data?: AccountingLedgerRow[];
  limit: number;
  page: number;
  itemsCount: number;
  pagesCount: number;
  totalCount: number;
}

export interface AccountingAccount {
  code: number | string;
  name: string;
  name_sv?: string;
  name_en?: string;
  vatcode_id?: number | string;
  vatcode_type?: 'sales' | 'purchases' | '';
  vatcode?: string;
  vatpercent?: number | string;
  is_active: 0 | 1;
}

export interface AccountingVatCode {
  id: number;
  type: 'sales' | 'purchases';
  name: string;
}

export interface AccountingPeriod {
  id: number;
  start_date: string;
  end_date: string;
}

export interface AccountingOpeningBalance {
  account_code: number | string;
  total_sum: number | string;
  debit_sum: number | string;
}

export interface AccountingLockingPeriod {
  code: 'accounting_locked' | 'sales_invoices_locked' | 'purchase_invoices_locked' | string;
  value: string | null;
}

export interface AccountingBudgetMonth {
  month: number;
  sum: number;
}

export interface AccountingBudgetDimension {
  dimension_id: number;
  period_total_sum?: number;
  months?: AccountingBudgetMonth[];
}

export interface AccountingBudgetAccount {
  code: string;
  period_total_sum?: number;
  months?: AccountingBudgetMonth[];
  dimensions?: AccountingBudgetDimension[];
}

export interface AccountingBudgetInput {
  name: string;
  accounting_period_id: number;
  accounts: AccountingBudgetAccount[];
}

export interface AccountingBudgetAccountResponse {
  account_code: string;
  period_total_sum: number;
  months: AccountingBudgetMonth[];
  dimensions: AccountingBudgetDimension[];
}

export interface AccountingBudget {
  id: number;
  name: string;
  accounting_period_id: number;
  accounts: AccountingBudgetAccountResponse[];
}
