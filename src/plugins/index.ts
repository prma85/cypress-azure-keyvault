/// <reference types="cypress" />

import { getKeyvaultData } from "./azure";

/**
 * @type {Cypress.PluginConfig}
 */

export function azureKeyvaultPlugin(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
  // configure plugins here
  on("task", { getKeyvaultData });

  return config;
}
