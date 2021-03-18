import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

// DefaultAzureCredential expects the following three environment variables:
// * AZURE_TENANT_ID: The tenant ID in Azure Active Directory
// * AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
// * AZURE_CLIENT_SECRET: The client secret for the registered application

// Keys need to be defined with a prefix

export interface GetKeyvaultDataOptions {
  vault: string;
  keys: string[];
  keyPrefix?: string;
  envSuffix?: string;
}

export interface KeyVaultData {
  envSuffix: string;
  data: {
    [i: string]: string
  }
}

function createClient(vault: string) {
  const url = `https://${vault}.vault.azure.net/`;
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(url, credential);
  return client;
}

export async function getKeyvaultData(options: GetKeyvaultDataOptions): Promise<KeyVaultData> {
  const client = createClient(options.vault);

  const {
    envSuffix = 'development',
    keys = ['username', 'password'],
    keyPrefix = null
  } = options;

  const secretPromises = keys.map(async (key) => {
    const secret = await client.getSecret(keyPrefix ? `${keyPrefix}-${key}` : key);
    return [key, secret.value];
  });
  const entries = await Promise.all(secretPromises);
  return {
    data: Object.fromEntries(entries),
    envSuffix,
  };
}
