import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  ios: {
    scheme: 'OmniMethodDev'
  },
  appId: 'com.shmorty.omni-method.app',
  appName: 'omni-method',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      /* web client */
      serverClientId:
        '164197842062-i2oqluboqhldepb0enpt0hlnmrongsvl.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 4000,
    },
  },
};

export default config;
