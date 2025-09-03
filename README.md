# fennoa-api-client

FennoaApiClient is a third party Fennoa API client.

:warning: This tool is in early stages and is subject to change.

## Installation

Add to project's package.json:

```
npm install @rantalainen/fennoa-api-client
```

## Setup

### Import to NodeJS project

```javascript
const { FennoaApiClient } = require('@rantalainen/fennoa-api-client');
```

### Import to TypeScript project

```javascript
import { FennoaApiClient } from '@rantalainen/fennoa-api-client';
```

### Setup client with options

In order to obtain an API key, please contact Fennoa Sales or Fennoa Support. An API key is needed to access all API functions.

```javascript
const fennoa = new FennoaApiClient({
  // Mandatory options:
  fennoaUser: 'selected_company_identifier',
  fennoaPassword: 'api_key',

  // Optional options (and default values):
  apiBaseUrl: 'https://app.fennoa.com/api',
  timeout: 120000
});
```

## Implemented methods

The following api methods have been implemented:

- `customers` Customers
- `sales` Sales invoices
- `purchases` Purchase invoices

### Getter examples

Each resource type has `getAll()` and `getById(1234)` getters (below examples with customers):

```javascript
const customers = await fennoa.customers.getAll(); // array of customers
const customer = await fennoa.customers.getById(1234); // single customer by id
```

### Customer examples

Get customer by customer number:

```javascript
const customer = await fennoa.customers.getByCustomerNo('1234'); // single customer by customer number
```

<br>
Create a new customer

```javascript
const newCustomer: INewCustomer = {
  customer_no: '1234',
  name: 'Test Customer 2 Oy',
  name2: 'Nimi 2',
  address: 'Test Address 1',
  postalcode: '00100',
  city: 'Helsinki',
  country_id: 'FI',
  description: 'Test Description',
  email: 'test@example.com',
  phone: '0123456789',
  fax: '0123456789',
  website: 'https://www.example.com',
  business_id: '1837795-7',
  vat_number: 'FI18377957',
  identity_number: '123456-7890',
  account_type_id: 1,
  contact_person: 'John Doe',
  einvoice_address: 'einvoice@example.com',
  einvoice_operator_id: 'OKOYFIHH',
  sales_invoice_delivery_method: 'email',
  customer_group_ids: [1, 2],
  locale_id: 1,
  locale_code: 'FI'
};

const createdCustomer = await fennoa.customers.createCustomer(newCustomer);
```

<br>
Update a customer

```javascript
const updateCustomer: IUpdateCustomer = {
  name: 'Updated Customer Oy'
  customer_group_ids: [3],
};

const updatedCustomer = await fennoa.customers.updateCustomer('1234', updateCustomer);
```

<br>

### Sales examples

Here is an example of creating, approving and sending a new sales invoice to a customer:

```javascript
const invoice = {
  name: 'Customer Inc',
  address: 'Mariankatu 2',
  postalcode: '00170',
  city: 'Helsinki',
  country: 'FI',
  invoice_date: '2018-12-12',
  due_date: '2018-12-26',
  row: [
    {
      name: 'My product',
      description: 'Describe product here',
      price: 14.5,
      quantity: 3,
      vatpercent: 14
    },
    {
      name: 'My service',
      description: 'Describe service here',
      price: 56.66,
      quantity: 12.5,
      vatpercent: 24
    }
  ]
};

// Create a new sales invoice to Fennoa
const newInvoiceId = await fennoa.sales.createInvoice(invoice);
console.log(`Sales invoice #${newInvoiceId} created`);

// Approve created sales invoice and send it to customer
await fennoa.sales.approveInvoice(newInvoiceId);
await fennoa.sales.sendInvoice(newInvoiceId);
console.log(`Sales invoice #${newInvoiceId} approved and sent to customer`);
```

Create a new sales invoice using FORM DATA:

```javascript
const newInvoiceId = await fennoa.sales.createInvoiceByFormData(formData);
```

Create a new sales invoice from Finvoice XML data:

```javascript
const newInvoiceId = await fennoa.sales.createInvoiceByFinvoiceXML(xml);
```

### Purchases examples

Here is an example of fetching all purchase invoices from approval queue:

```javascript
const purchases = await fennoa.purchases.getApprovalQueue();
```

Fetch single purchase invoice by ID:

```javascript
const purchaseInvoice = await fennoa.purchases.getPurchaseInvoiceById(12);
```

Approve purchase invoice by approval ID with an optional comment:

```javascript
fennoa.purchases.approvePurchaseInvoice(2, 'Approved by automation');
```

Add payment to purchase invoice:

```javascript
const paymentInfo = {
  purchase_invoice_id: 2,
  sum: 100,
  payment_date: '2025-03-01',
  description: 'Paid by automation'
};

await fennoa.purchases.addPurchasePayment(paymentInfo);
```

## Resources

- Fennoa website: https://www.fennoa.com/
- Fennoa API Documentation: https://www.fennoa.com/api-documentation/
- Fennoa login page: https://app.fennoa.com/login

```

```
