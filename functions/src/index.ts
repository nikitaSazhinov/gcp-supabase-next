import { initializeApp } from 'firebase-admin/app';
import functions from './functions';

type ConfigType = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};
type ConfigByEnvType = {
  [key: string]: ConfigType;
};

// For setting up future env channels (dev/production)
const channels = ['production'];

const env = process.env.ENVIRONMENT || 'production';

const isEnableReleaseChannel = channels.includes(env);

if (!isEnableReleaseChannel) {
  throw new Error('Not found release channel');
}


const fbApiKey = process.env.FB_API_KEY;
const fbAuthDomain = process.env.FB_AUTH_DOMAIN;
const fbProjectId = process.env.FB_PROJECT_ID;
const fbStorageBucket = process.env.FB_STORAGE_BUCKET;
const fbMessagingSenderId = process.env.FB_MESSAGING_SENDER_ID;
const fbAppId = process.env.FB_APP_ID;

if (!fbApiKey || !fbAuthDomain || !fbProjectId || !fbStorageBucket || !fbMessagingSenderId || !fbAppId) {
  throw new Error('Not found firebase config');
}

const firebaseConfigByChannel: ConfigByEnvType = {
  production: {
    apiKey: fbApiKey,
    authDomain: fbAuthDomain,
    projectId: fbProjectId,
    storageBucket: fbStorageBucket,
    messagingSenderId: fbMessagingSenderId,
    appId: fbAppId,
  },
};

const firebaseConfig = firebaseConfigByChannel[env];

initializeApp(firebaseConfig);

export { functions };
