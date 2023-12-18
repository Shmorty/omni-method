import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
  ios: {
    scheme: 'AppDev'
  },
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
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 2000,
    },
  },
};

export default config;
