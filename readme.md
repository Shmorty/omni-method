
#Setting up google authentication
https://developers.google.com/identity/gsi/web/guides/client-library

Add to index.html
<script src="https://accounts.google.com/gsi/client" async defer></script>

Then add typescript types
npm install @types/gapi.auth2

addtypes to tsconfig.app.json

  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": ["gapi", "gapi.auth2"]
  },

