built with
- Angular https://angular.io/
- Capactor
-- https://capacitorjs.com/
-- https://capacitorjs.com/solution/angular
- Ionic


need to install 
- node
- xcode
- cocoapods
- capacitor
  npm i -g @ionic/cli




#Setting up google authentication
https://developers.google.com/identity/gsi/web/guides/client-library

https://console.cloud.google.com/apis/dashboard


Add to index.html
<script src="https://accounts.google.com/gsi/client" async defer></script>

Then add typescript types
npm install @types/gapi.auth2

addtypes to tsconfig.app.json

  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": ["gapi", "gapi.auth2"]
  },

