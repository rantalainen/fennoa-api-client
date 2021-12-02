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
const { FennoaApiClient } = require('fennoa-api-client');
```

### Import to TypeScript project

```javascript
import { FennoaApiClient } from 'fennoa-api-client';
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

The following api resources have been implemented:

- `customers` Customers
- `sales` Sales invoices

### Getter examples

Each resource type has `getAll()` and `getById(1234)` getters (below examples with customers):

```javascript
const customers = await fennoa.customers.getAll(); // array of customers
const customer = await fennoa.customers.getById(1234); // single customer
```

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

## Resources

- Fennoa website: https://www.fennoa.com/
- Fennoa API Documentation: https://www.fennoa.com/api-documentation/
- Fennoa login page: https://app.fennoa.com/login

## Changelog

- 0.0.1 First release
