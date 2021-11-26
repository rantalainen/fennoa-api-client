export interface INewSalesInvoice {
  /** Customer number */
  customer_no?: number;
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
  /** Delivery method of the invoice (email, finvoice, postal, consumerfinvoice, consumerdirect, manual) */
  delivery_method?: string;
  /** Delivery terms */
  delivery_terms?: string;
  /** Delivery method of the goods (free text field printed on the invoice) */
  delivery_method_text?: string;
  /** Use `price_with_vat` fields as primary and calculate the net sums from gross sums (0 = No, 1 = Yes) */
  include_vat?: number;
  /** Sales invoice series ID */
  sales_invoice_series_id: number;
  /** Auxiliary name identifier, if any */
  auxiliary_name_id?: number;
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
  /** Dimension (<dimtype>) */
  dim?: string;
}
