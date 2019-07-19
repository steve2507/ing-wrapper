# ING-Wrapper
This is a Node.JS wrapper around the [ING open banking API](https://developer.ing.com).
This wrapper _does not yet function_. Notably, the signature header implementation is missing. Also, only the [Account Information API](https://developer.ing.com/api-marketplace/marketplace/b6d5093d-626e-41e9-b9e8-ff287bbe2c07/overview) is implemented. Others, such as the [Payment Initiation API](https://developer.ing.com/api-marketplace/marketplace/6aa25087-d05d-428e-b7c6-d9131cb46498/overview) are still missing.

# Examples

## Getting account balances
```javascript
const IngWrapper = require('ing-wrapper');

// initiate the wrapper
const myIngWrapper = new IngWrapper({
  url: 'https://api.ing.com',
  customerAccessToken: 'myToken'
});

// get an array of all accounts you are subscribed to
const accounts = await myIngWrapper.Account.getAll();
console.log(accounts); // [{"iban": "NL69INGB0123456789", ...}, ...]
```

# Prerequisites
Most of the detailed documentation to get access to the ING API's can be found here: [get started on ING developer portal](https://developer.ing.com/openbanking/get-started).

## Retrieve customer access token
The customer access token is provided as a parameter when constructing a new IngWrapper instance. You will need to obtain this token from the ING developer portal.

# API

## Account
Retrieve account details, balance and transaction information.
More details can be found on the [Account Information API page](https://developer.ing.com/api-marketplace/marketplace/b6d5093d-626e-41e9-b9e8-ff287bbe2c07/overview).

### Account statics
-   __getAll()__
    Provides all granted accounts and will provide account details for the list of accounts.
    If there are no granted accounts at all, an empty array is returned.
    This is contrary to the ING API specification which throws a 404.

### Account methods
-   __getBalances()__
-   __getTransactions()__
