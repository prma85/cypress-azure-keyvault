import { GetKeyvaultDataOptions, KeyVaultData } from "../../plugins/azure";
export { GetKeyvaultDataOptions, KeyVaultData };

type GetKeyvaultData = (options: GetKeyvaultDataOptions) => Cypress.Chainable<KeyVaultData>;
export const getKeyvaultData:GetKeyvaultData = (options) =>
  cy.task("getKeyvaultData", options);
