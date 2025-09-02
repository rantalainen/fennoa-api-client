export interface INewCustomer {
  /** Customer number */
  customer_no?: string;
  /** Name of the customer */
  name: string;
  /** Name2 of the customer */
  name2?: string;
  /** Address of the customer */
  address: string;
  /** Postal code of the customer */
  postalcode: string;
  /** City of the customer */
  city: string;
  /** Country of the customer as ISO 3166-1 alpha-2 format */
  country_id: string;
  /** Description of the customer */
  description?: string;
  /** Email of the customer */
  email?: string;
  /** Phone number of the customer */
  phone?: string;
  /** Fax number of the customer */
  fax?: string;
  /** Website of the customer */
  website?: string;
  /** Business id of the customer */
  business_id?: string;
  /** VAT number of the customer */
  vat_number?: string;
  /** Consumer customer´s ID */
  identity_number?: string;
  /** Type of account
   * 1=company
   * 2=consumer */
  account_type_id?: number;
  /** Contact person */
  contact_person?: string;
  /** Einvoice address (or email address if sales_invoice_delivery_method is email) */
  einvoice_address?: string;
  /** Einvoice operator ID or Fennoa´s internal ID */
  einvoice_operator_id?: string;
  /** Sales invoice delivery method.
   * email=email
   * finvoice=eInvoice
   * postal=postal
   * consumerfinvoice= consumer eInvoice
   * consumerdirect= consumer eInvoice, direct
   * manual= manual delivery */
  sales_invoice_delivery_method?: "email" | "finvoice" | "postal" | "consumerfinvoice" | "consumerdirect" | "manual";
  /** Customer group id. Could be multiple rows. */
  customer_group_ids?: number[];
  /** Language of the customer and invoice, use ID or ISO 639-1 language code.
   * 1= FI, 2= EN, 4= SV.
   * locale_id is dominant if both are used */
  locale_id?: number;
  /** Language of the customer and invoice, ISO 639-1 language code.
   * FI, EN,SV.
   * locale_id is dominant if both are used */
  locale_code?: string;
}

export interface IUpdateCustomer {
  /** Name of the customer */
  name?: string;
  /** Address of the customer */
  address?: string;
  /** Postal code of the customer */
  postalcode?: string;
  /** City of the customer */
  city?: string;
  /** Country of the customer as ISO 3166-1 alpha-2 format */
  country_id?: string;
  /** Name2 of the customer */
  name2?: string;
  /** Description of the customer */
  description?: string;
  /** Email of the customer */
  email?: string;
  /** Phone number of the customer */
  phone?: string;
  /** Fax number of the customer */
  fax?: string;
  /** Website of the customer */
  website?: string;
  /** Business id of the customer */
  business_id?: string;
  /** VAT number of the customer */
  vat_number?: string;
  /** Sales invoice delivery method.
   * email=email
   * finvoice=eInvoice
   * postal= postal
   * consumerfinvoice= consumer eInvoice
   * consumerdirect= consumer eInvoice, direct
   * manual= manual */
  sales_invoice_delivery_method?: "email" | "finvoice" | "postal" | "consumerfinvoice" | "consumerdirect" | "manual";
  /** Customer e-invoice address or email address for invoicing */
  einvoice_address?: string;
  /** e-invoice operator address */
  einvoice_operator_id?: string;
  /** Customer group id. You can add multiple customer group */
  customer_group_ids?: number[];
  /** Language of the customer and invoice, use ID or ISO 639-1 language code.
   * 1= FI, 2= EN, 4= SV.
   * locale_id is dominant if both are used */
  locale_id?: number;
  /** Language of the customer and invoice, ISO 639-1 language code.
   * FI, EN,SV.
   * locale_id is dominant if both are used */
  locale_code?: string;
}
