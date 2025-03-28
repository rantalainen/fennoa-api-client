export interface ApprovalQueueResponse {
  count: number;
  page: number;
  queue: [
    {
      PurchaseInvoice: PurchaseInvoice;
      PurchaseInvoiceApproval: PurchaseInvoiceApproval;
      OtherPurchaseInvoiceApproval: PurchaseInvoiceApproval[];
      Attachments:
        | [
            {
              id: number;
              file: string;
              mimetype: string;
            }
          ]
        | null;
    }
  ];
}

interface PurchaseInvoice {
  id: string;
  supplier_name: string;
  supplier_business_id?: string;
  supplier_vat_number?: string;
  invoice_date: string;
  due_date: string;
  entry_date?: string;
  modified?: string;
  total_gross: string;
  total_due: string;
  total_gross_hc: string;
  total_net?: string;
  total_net_hc?: string;
  currency_rate: string;
  our_reference?: string;
  your_reference?: string;
  invoice_number?: string;
  order_number?: string;
  purchase_order_id?: number | null;
  bank_account?: string;
  bank_bic?: string;
  bank_message?: string;
  bank_reference?: string;
  terms_of_payment?: string;
  is_receipt: string;
  is_first_invoice: string;
  on_hold?: string;
  payable_account_code?: string;
  finvoice_available: number;
  created: string;
  Currency?: {
    code: string;
    name?: string;
  };
  PurchaseInvoiceType?: {
    name: string;
  };
  PurchaseInvoiceRow?: PurchaseInvoiceRow[] | PurchaseInvoiceRow;
  Comment?: {
    id?: string | null;
    from_user_id?: string | null;
    to_user_id?: string | null;
    reply_to_comment_id?: string | null;
    request_reply?: string | null;
    message?: string | null;
    is_read?: string | null;
    created?: string | null;
  };
}

interface PurchaseInvoiceApproval {
  id: string;
  approval_level: string;
  status: string;
  created?: string;
}

interface PurchaseInvoiceRow {
  article_identifier?: string | null;
  article_name?: string | null;
  freetext?: string | null;
  price?: string | null;
  unit?: string | null;
  quantity?: string | null;
  sum_net?: string | null;
  sum_gross?: string | null;
  vatpercent?: string | null;
  discount_value?: string | null;
  discount_percent?: string | null;
}

export interface SinglePurchaseInvoiceResponse {
  PurchaseInvoice: {
    id: number;
    supplier_name: string;
    supplier_business_id?: string;
    supplier_vat_number?: string;
    invoice_date: string;
    due_date: string;
    entry_date?: string;
    total_gross: number;
    total_due: number;
    total_gross_hc: number;
    total_net?: number;
    total_net_hc?: number;
    currency_rate: number;
    our_reference?: string;
    your_reference?: string;
    invoice_number?: string;
    order_number?: string;
    purchase_order_id?: number | null;
    bank_account?: string;
    bank_bic?: string;
    bank_message?: string;
    bank_reference?: string;
    terms_of_payment?: string;
    is_receipt: number;
    is_first_invoice: number;
    finvoice_available: number;
    created: string;
    modified?: string;
    Currency?: {
      code: string;
      name: string;
    };
    PurchaseInvoiceType?: {
      name: string;
    };
    PurchaseInvoiceRow?: {
      article_identifier?: string | null;
      article_name?: string | null;
      freetext?: string | null;
      price?: number | null;
      unit?: string | null;
      quantity?: number | null;
      sum_net?: number | null;
      sum_gross?: number | null;
      vatpercent?: number | null;
      discount_value?: number | null;
      discount_percent?: number | null;
    }[];
  };
  Attachments?:
    | {
        id: number;
        file: string;
        mimetype: string;
        filesize: string;
      }[]
    | null;
  ApprovalStatus?: {
    status_id: number;
    status: string;
    Approvers: {
      user_id: string;
      approval_level: string;
      approval_level_id: string;
      status_id: string;
      status: string;
    }[];
  };
}

export interface PurchaseInvoicePaymentInfo {
  purchase_invoice_id: number;
  sum: number;
  payment_date: string; // Format: YYYY-MM-DD
  description?: string;
  account_code?: string;
}

export interface ApprovePurchaseInvoiceResponse {
  status: 'OK' | 'ERROR';
  errors?: string[];
}

export interface AddPaymentResponse {
  status: 'OK' | 'ERROR';
  errors?: string[];
}
