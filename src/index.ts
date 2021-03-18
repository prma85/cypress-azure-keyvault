import { GetKeyvaultDataOptions, KeyVaultData } from "./plugins/azure";
import "./support";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Retrieve data from Azure Key Vaults.
       *
       * @param {object} options - GetKeyvaultDataOptions
       * @param {string} options.vault - the vault name
       * @param {string[]} options.keys - a list of keys to retrive from Azure
       * @param {string} [options.envSuffix] -  environment suffix used (in case of testing to multiple environments)
       * @param {string} [options.keyPrefix] -  in case your key have a prefix. It could be user1-id, user2-id, or just get the key id
       *
       * @example cy.getKeyvaultData({
       *   vault: 'myAppVault',
       *   keys: ['user', 'password']
       * }).then(result => {
       *  console.log(result);
       *  // data: { user: "admin", password: "1q2w3e4r!@#$" }, envSuffix: "development" }
       * })
       *
       * @returns Chainable<KeyVaultData>
       *
       */
       getKeyvaultData(options: GetKeyvaultDataOptions): Chainable<KeyVaultData>;

    }
  }
}
