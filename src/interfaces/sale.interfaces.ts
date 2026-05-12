export interface INewSalesInvoice {
  /** Customer number */
  customer_no?: string;
  /** Account type. 1=company (default), 2=consumer */
  account_type_id?: number;
  /** Name of the customer */
  name: string;
  /** Secondary name of the customer */
  name2?: string;
  /** Address of the customer */
  address: string;
  /** Postalcode of the customer */
  postalcode: string;
  /** City of the customer */
  city: string;
  /** Country code of the customer. */
  country: string;
  /** Phone number of the customer */
  phone?: string;
  /** Email of the customer */
  email?: string;
  /** Unique identifier of the tax classification */
  sales_invoice_taxclass_id?: number;
  /** Invoice type (1 = debit invoice, 2 = credit invoice) */
  invoice_type_id?: number;
  /** VAT number of the customer */
  vat_number?: string;
  /** Currency code */
  currency?: string;
  /** Invoice date */
  invoice_date: string;
  /** Due date */
  due_date: string;
  /** Shipping (entry) date */
  shipping_date?: string;
  /** Cash discount date (if any) */
  cash_discount_date?: string;
  /** Cash discount percent (if any) */
  cash_discount_percent?: number;
  /** Banking reference (if omitted, Fennoa will calculate automatically) */
  banking_reference?: string;
  /** Language of the invoice (fi, sv, en) */
  locale?: string;
  /** Our reference */
  our_reference?: string;
  /** Your reference */
  your_reference?: string;
  /** Contact person */
  contact_person?: string;
  /** Penal interest */
  penal_interest?: number;
  /** Notes visible in the invoice form above invoice rows */
  notes_before?: string;
  /** Customer e-invoice address */
  einvoice_address?: string;
  /** Customer’s einvoice operator’s address */
  einvoice_operator?: string;
  /** Shipping name (if any) */
  shipping_name?: string;
  /** Secodary shipping name (if any) */
  shipping_name2?: string;
  /** Shipping address (if any) */
  shipping_address?: string;
  /** Shipping postalcode (if any) */
  shipping_postalcode?: string;
  /** Shipping city (if any) */
  shipping_city?: string;
  /** Shipping country (code, if any) */
  shipping_country?: string;
  /** Start of the delivery period */
  delivery_period_start?: string;
  /** End of the delivery period */
  delivery_period_end?: string;
  /** If this is a credit invoice, enter the credited (debit) invoice number here */
  credited_invoice_no?: number;
  /** Invoice number in the source system. Fennoa will use this as the final invoice number once the invoice has been approved. */
  proposed_invoice_number?: number;
  /** Internal notes (not visible in the invoice) */
  notes_internal?: string;
  /** Unique identifier of the factoring partner. Requires contracts with factoring partners and enabling factoring in Fennoa settings. */
  sales_factoring_partner_id?: number;
  /** Order identifier */
  order_identifier?: string;
  /** Agreement identifier */
  agreement_identifier?: string;
  /** Tender reference */
  tender_reference?: string;
  /** Delivery note identifier */
  delivery_note_identifier?: string;
  /** Waybill identifier */
  waybill_identifier?: string;
  /** Delivery method of the invoice (email, finvoice, postal, consumerfinvoice, consumerdirect, manual) */
  delivery_method?: string;
  /** Delivery terms */
  delivery_terms?: string;
  /** Delivery method of the goods (free text field printed on the invoice) */
  delivery_method_text?: string;
  /** Use `price_with_vat` fields as primary and calculate the net sums from gross sums (0 = No, 1 = Yes) */
  include_vat?: number;
  /** Sales invoice series ID */
  sales_invoice_series_id?: number;
  /** Auxiliary name identifier, if any */
  auxiliary_name_id?: number;
  /** Sales pricelist id */
  sales_pricelist_id?: number;
  /** Specification details */
  notes_fixed_width?: string | string[];
  /** Invoice rows array */
  row?: INewSalesInvoiceRow[];
}

export interface INewSalesInvoiceRow {
  /** Product number */
  product_no?: string;
  /** Product name */
  name?: string;
  /** Description */
  description?: string;
  /** Price */
  price?: number;
  /** Quantity */
  quantity?: number;
  /** Unit */
  unit?: string;
  /** VAT-% (0, 10, 14, 24) */
  vatpercent?: number;
  /** Accounting account code */
  account_code?: string;
  /** Discount-% */
  discount_percent?: number;
  /** Row dimensions, e.g. { dim1: '1000' } */
  dim?: Record<string, string | number>;
}

export interface SalesInvoiceSendOptions {
  delivery_method?: 'finvoice' | 'email' | 'postal' | 'consumerfinvoice' | 'consumerdirect' | 'manual';
  address?: string;
  postalcode?: string | number;
  city?: string;
  country?: string;
  einvoice_address?: string;
  einvoice_operator_address?: string;
}

export interface SalesInvoiceDueDatePatch {
  due_date: string;
}

export interface SalesInvoicePaymentInfo {
  invoice_no: string;
  payment_date: string;
  sum: number;
  payment_type: number;
  is_factoring: 0 | 1;
  description?: string;
}

export interface SalesInvoicePaymentListItem {
  SalesInvoicePayment: {
    id: number | string;
    date: string;
    description?: string;
    sum: number | string;
  };
  SalesInvoice: {
    id: number | string;
    name: string;
    invoice_no: number | string;
  };
}

export interface SalesInvoiceDeliveryError {
  sales_invoice_id: number | string;
  invoice_no: number | string;
  queued: string;
  sent_message: string;
}

export interface SalesInvoicePdfResponse {
  body: Buffer;
  filename?: string;
  contentType?: string;
  headers: Record<string, unknown>;
}

export interface SalesInvoiceResponse {
  SalesInvoice?: {
    id: number | string;
    invoice_no?: number | string;
    invoice_type_id?: number | string;
    auxiliary_name_id?: number | string;
    customer_id?: number | string;
    name?: string;
    name2?: string;
    address?: string;
    postalcode?: string;
    city?: string;
    shipping_name?: string;
    shipping_name2?: string;
    shipping_address?: string;
    shipping_postalcode?: string;
    shipping_city?: string;
    total_net?: number | string;
    total_gross?: number | string;
    total_vat?: number | string;
    total_paid?: number | string;
    total_due?: number | string;
    banking_reference?: string;
    invoice_date?: string;
    due_date?: string;
    cash_discount_date?: string;
    cash_discount_sum?: number | string;
    cash_discount_percent?: number | string;
    vat_number?: string;
    our_reference?: string;
    your_reference?: string;
    penal_interest?: number | string;
    complaint_days?: number | string;
    notes_internal?: string;
    notes_before?: string;
    delivery_method?: string;
    delivery_terms?: string;
    shipping_date?: string;
    delivery_period_start?: string;
    delivery_period_end?: string;
    order_identifier?: string;
    agreement_identifier?: string;
    tender_reference?: string;
    delivery_note_identifier?: string;
    waybill_identifier?: string;
    created?: string;
  };
  Country?: { code: string };
  ShippingCountry?: { code: string };
  Currency?: { code: string };
  PaymentTerm?: {
    id?: number | string;
    name?: string;
    days?: number | string;
    discount_1_days?: number | string;
    discount_1_percent?: number | string;
    discount_2_days?: number | string;
  };
  SalesInvoiceRow?: Array<{
    product_id?: number | string;
    code?: string;
    name?: string;
    description?: string;
    price?: number | string;
    price_with_vat?: number | string;
    include_vat?: 0 | 1 | number;
    quantity?: number | string;
    unit?: string;
    vatpercent?: number | string;
    discount_percent?: number | string;
    total_net?: number | string;
    total_vat?: number | string;
    total_gross?: number | string;
    dim?: string;
    ProductGroups?: { id?: number | string; name?: string };
  }>;
  SalesInvoiceDelivery?: Array<{
    address?: string;
    einvoice_operator_id?: number | string | null;
    bic?: string;
    sent?: string;
  }>;
  SalesInvoicePayment?: Array<{
    description?: string;
    sum?: number | string;
    payment_date?: string;
    created?: string;
  }>;
}
