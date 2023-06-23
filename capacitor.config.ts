import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shmorty.omni-method.app',
  appName: 'omni-method',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      /* web client */
      serverClientId:
        '164197842062-i2oqluboqhldepb0enpt0hlnmrongsvl.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    Splashscreen: {
      launchAutoHide: true,
      launchShowDuration: 1000,
    },
  },
};

export default config;
