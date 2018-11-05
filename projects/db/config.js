// const { getRegion, decryptBasicAuth, decryptString } = require('google');

// const getCredentials = async () => {
//   let credentials;
//   const encFileName = `postgres-${getRegion()}.yml.enc`;
//   try {
//     // NOTE: credentials will contain the fields 'username' and 'password' only
//     credentials = await decryptBasicAuth(encFileName, 'postgres');
//     return { ...credentials, database: 'postgres' };
//   } catch (error) {
//     throw error;
//   }
// };

const options = {
  host: 'localhost',
  port: 5432,

  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  define: {
    timestamps: true,
  },
};

const initOptions = () => {
  // Override default options using env-specific settings
  const envOptions = {};
  Object.assign(envOptions, options);
  switch (process.env.NODE_ENV) {
    case 'development':
      // NOTE: Uncomment if you need to clear your dev db
      envOptions.sync = { force: true };
      break;
    case 'test':
      // Disable logging when testing
      envOptions.logging = () => {};
      envOptions.sync = { force: true };
      break;
    case 'staging':
      envOptions.logging = () => {};
      envOptions.port = 5432;
      break;
    case 'production':
      envOptions.logging = () => {};
      envOptions.port = 5432;
      break;
    default:
      throw Error('NODE_ENV is undefined');
  }
  return envOptions;
};

const initLocalSettings = () => {
  const envSettings = require('./envSettings.json'); // eslint-disable-line global-require
  const envOptions = initOptions();

  return {
    ...envSettings[process.env.NODE_ENV],
    options: envOptions,
  };
};

const initEncryptedSettings = async () => {
  // let envCredentials;
  // try {
  //   envCredentials = await getCredentials();
  // } catch (error) {
  //   console.log('[DB SETUP] Error decrypting postgres credentials');
  //   throw error;
  // }
  // const envOptions = initOptions();
  // return {
  //   ...envCredentials,
  //   options: envOptions,
  // };
};

// let encryptionKey;
// const initIdentifierEncryptionKey = async () => {
//   if (encryptionKey) return encryptionKey;
//   if (['test', 'development'].includes(process.env.NODE_ENV)) {
//     encryptionKey = 'encryptionKey';
//   } else {
//     try {
//       encryptionKey = await decryptString('identifier-key.enc', 'identifierKey');
//     } catch (error) {
//       console.log('Error decrypting identifier encryption secret key', { error }, 'error');
//     }
//   }
//   return encryptionKey;
// };
// const getIdentifierEncryptionKey = () => encryptionKey;

module.exports = {
  initLocalSettings,
  initEncryptedSettings,
  // getIdentifierEncryptionKey,
  // initIdentifierEncryptionKey,
};
