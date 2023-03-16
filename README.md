# cypress-azure-keyvault

[![npm version](https://badge.fury.io/js/cypress-azure-keyvault.svg)](https://badge.fury.io/js/cypress-azure-keyvault)[![Codacy Badge](https://app.codacy.com/project/badge/Grade/80c98201d9d44cedbd999251c609a8f5)](https://www.codacy.com/gh/prma85/cypress-azure-keyvault/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prma85/cypress-azure-keyvault&amp;utm_campaign=Badge_Grade)

A custom Cypress plugin to access recover keys from Microsoft Azure Key Vaults.

## Installation

```bash
npm install cypress-azure-keyvault --save-dev
```

or

```bash
yarn add cypress-azure-keyvault --dev
```

## Configuring

### Load the Module

Register the package's commands for use in your tests on your `cypress/support/index.ts` (or js file):

```ts
import "cypress-azure-keyvault";
```

And now you need to load the plugin into your `cypress/plugins/index.js`:

```js
const { azureKeyvaultPlugin } = require("cypress-azure-keyvault/dist/plugins");
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return azureKeyvaultPlugin(on, config);
};
```

If using typescript, load the plugin into your `cypress/plugins/index.ts`:

```ts
import { azureKeyvaultPlugin } from  "cypress-azure-keyvault/dist/plugins";
export default (on, config) => azureKeyvaultPlugin(on, config);
```

### Configure access to Azure Key Vaults

In order to use the Azure Key Vault plugin, you must store your Azure access information as environment variables (either locally or/and define environment variables on azure).

You can also set it in a .env file (if you are using `dotenv-cli` package) or into your pipeline (as build variables).

You can find where to generate these values on the [Azure Portal](https://portal.azure.com/).

```bash
  export AZURE_CLIENT_ID="generated-app-ID"
  export AZURE_CLIENT_SECRET="random-password"
  export AZURE_TENANT_ID="tenant-ID"
```

## Using the `cy.getKeyvaultData()`

### Command interface

```ts
// command parameters
interface GetKeyvaultDataOptions {
  vault: string; // they keyvault name
  keys: string[]; // list of keys that you want to recover
  keyPrefix?: string; // a prefix for each key if the key vault is shared or if you prefix your keys by environment (optional)
  envSuffix?: string; // identifier for the environment (optional)
}

// command return
interface KeyVaultData {
  envSuffix: string;
  data: {
    [i: string]: string;
  };
}
```

### Example

#### Without key prefix

```ts
describe("Example Azure Key Vault Flow", () => {
  let keysValues;
  before(() => {
    cy.getKeyvaultData({
      vault: 'myAppVault',
      keys: ['user', 'password']
    }).then(result => (keysValues = result.data));
  });

  it("should use key vault", () => {
    // my login tasks
    console.log(keysValues);
    // { user: "admin", password: "admin123!" }
  })
```

#### With key prefix

```ts
describe("Example Azure Key Vault Flow", () => {
  let keysValues;
  before(() => {
    cy.getKeyvaultData({
      vault: 'myAppVault',
      keys: ['user', 'password'],
      keyPrefix: "production"
    }).then(result => (keysValues = result.data));
  });

  it("should use key vault", () => {
    // my login tasks
    console.log(keysValues);
    // { production-user: "admin", production-password: "!QAWS@##was342" }
  })
```
