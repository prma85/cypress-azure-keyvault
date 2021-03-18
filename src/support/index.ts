/// <reference types="cypress" />

import { getKeyvaultData } from "./commands/azure";

Cypress.Commands.add("getKeyvaultData", getKeyvaultData);
