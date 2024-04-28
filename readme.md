# Omni Method

## built with

- Angular <https://angular.io/>
- Capacitor <https://capacitorjs.com/>
- Capacitor Angular <https://capacitorjs.com/solution/angular>
- Ionic

need to install

- node
- xcode
- cocoapods
- capacitor
  npm i -g @ionic/cli

```text
% npm -g list
/usr/local/lib
├── @angular/cli@15.2.4
├── @aws-amplify/cli@10.6.2
├── @ionic/cli@6.20.6
├── cordova-res@0.15.4
├── corepack@0.15.3
├── firebase-tools@12.3.1
├── json-server@0.17.1
├── n@9.0.1
├── npm@9.6.2
├── nx@15.8.8
├── serverless@3.26.0
└── typescript@5.0.2
```

July 16, 2023

```bash
$ npm -g list         
/usr/local/lib
├── @angular/cli@16.1.4
├── @aws-amplify/cli@12.1.1
├── @ionic/cli@7.1.1
├── cordova-res@0.15.4
├── corepack@0.19.0
├── firebase-tools@12.4.4
├── json-server@0.17.3
├── n@9.1.0
├── npm@9.8.0
├── nx@16.5.2
├── serverless@3.33.0
└── typescript@5.1.6
```

---

## to build locally

1. clone repo
2. run npm install
3. ionic serve

## deploy function

firebase login
firebase projects:list
firebase --project [Project ID] deploy --only functions

## Using NgRx

helpful articles

- [NgRx](https://www.concretepage.com/ngrx/ngrx-effects-example)
- [tutorial](https://eliteionic.com/tutorials/using-ngrx-for-state-management-in-an-ionic-angular-application/)

### App State

```json
{
  "Auth": {
    "email": "fake@email.com",
    "emailValidate": true,
    "uid": "123",
  },
  "User": {
    "uid": "123",
    "email": "test@email.com",
    "firstName": "John",
    "lastName": "Doe",
    "nickName": "Jake",
    "dob": "2007-08-30",
    "weight": 129,
    "omniScore": 1234,
    "categoryScores": {
      "STRG": 123,
      "ENDR": 123,
      "POWR": 123,
      "FLEX": 123,
      "META": 123,
      "NEUR": 123,
    }
  },
  "scores": [
    {
      "calculatedScore": 360,
      "notes": "",
      "scoreDate": "1/16/2023",
      "aid": "BNCH",
      "rawScore": 216,
      "uid": "anJJeMDX6RTHDNOCPpPIxOObLy92",
    }
  ],
  "Assessments": [
    {
      "max":70,
      "min":20,
      "icon":"/assets/images/Agility.jpg",
      "label":"Agility",
      "aid":"AGLTY",
      "cid":"NEUR",
      "description":"Must touch cone with hand. Order of cones must be followed. Feet cannot cross during the left and right cones."
    },
  ],
  "Categories": [],
}
```

User_data
PK                SK
USER#{ User ID }  #META#{ User ID }

User_scores
PK                SK
USER#{ User ID }  SCORE#{ Assessment ID }#{ Assessment Date }

Rankings
???

## Database Services

| Function | End-point |
| ------ | ------ |
| addUser | POST /users |
| getUserScores | GET /users/{id} |
| addScore | POST /users/{id}/scores |
| delScore | DELETE /users/{id}/scores |
|  |  |

### Actions

- new user
- new score

## Setting up google authentication

[Google client library](https://developers.google.com/identity/gsi/web/guides/client-library) - Guides

[Google cloud console](https://console.cloud.google.com/apis/dashboard) - Dashboard

Add to index.html

```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

Then add typescript types
npm install @types/gapi.auth2

addtypes to tsconfig.app.json

"compilerOptions": {
"outDir": "./out-tsc/app",
"types": ["gapi", "gapi.auth2"]
},

### New user registration

1. capture email and password on register page
2. call auth service register method
3. call fireauth createUserWithEmailAndPassword
4. dispatch registerUserSuccess and navigate to new-user page
5. reducer sets authUser data in store
6. new-user page calls userService.saveUser
7. add authUser id and email to user data
8. dispatch UserActions.newUser
9.

## Try a diagram

```mermaid
graph TD
    A[New User] -->|enroll| B(fill profile)
    B --> C{View Categories}
    C -->|Learn| D[Assessements]
    C -->|Enter| E[Assesment]
    C -->|Connect| F[Find Friends]
```

## setup App Icon for capacitor

1. install cordova-res

   ```bash
   npm install -g cordova-res
   ```

2. create files

   ```text
   - resources/icon.png
   - resources/splash.png
   ```

3. run ionic plugin configuration script

## Firebase

[Simon Grimm - Google login tutorial](https://www.youtube.com/watch?v=GwtpoWZ_78E)

[omni-login user](https://console.firebase.google.com/project/omni-login-63e9f/authentication/users)

### authentication plugins

Firebase authentication for capacitor
[github](https://github.com/chemerisuk/cordova-plugin-firebase-authentication)

```bash
npm install cordova-plugin-firebase-authentication 
npm install @awesome-cordova-plugins/firebase-authentication 
ionic cap sync
```

GooglePlus for capacitor
[github](https://github.com/EddyVerbruggen/cordova-plugin-googleplus)

```bash
npm install cordova-plugin-googleplus 
npm install @awesome-cordova-plugins/google-plus 
ionic cap sync
```

CodetrixStudio CapacitorGoogleAuth
[github](https://github.com/CodetrixStudio/CapacitorGoogleAuth)
[youtube tutorial](https://www.youtube.com/watch?v=GwtpoWZ_78E)

Google login with iOS but doesn't integrate with Firebase

login wiht google

```json
{email: 'shmorty@gmail.com', familyName: 'Martel', givenName: 'Paul', id: '105435612519431770106', imageUrl: 'https://lh3.googleusercontent.com/a/AAcHTtcqYWdMHw0fnX_vesdoG0NStZqC_H5wtmVrVi7hpQ=s96-c', …}
```

login with email

```json
{payload: {…}, type: '[User Login] User Authenticated'}
```

## Image Cropping and Transformation with Ionic Angular

Tutorial <https://www.youtube.com/watch?v=06K7nzGYRtU>

### Setup

Install packages

- "ngx-image-cropper" <https://github.com/Mawi137/ngx-image-cropper>
-- (wraps package cropper.js)
- "hammerjs" for mobile gestures

update main.ts

```javascript
import "hammerjs"; 
```

add ImageCropperModule to component

css

```css
--cropper-outline-color: rgba(0, 0, 0, 0.5);
--cropper-overlay-color: var(--ion-background-color);
```

TypeScript

```javascript
@ViewChild('cropper') cropper: ImageCropperComponent;
isMobile = Capacitor.getPlatform() !== 'web';
transform: ImageTransform = {};

constructor(private loadingCtrl: LoadingController){}

selectImage() {
  cconst image = await Camera.getPhoto({
    quality: 100,
    allowEditing: true,
    resultType: CameraResultType.Base64,
  });
  const loading = await this.loadingCtrl.create();
  await loading.present();

  this.myImage = `data:image/jpeg;base64,...`
  this.croppedImage = null;
}
imageLoaded(){
  this.loadingCtrl.dismiss();
}
loadImageFailed() {
  console.log("Image load failed");
}
cropImage() {
  this.croppedImage = this.cropper.crop().base64;
  this.myImage = null;
}
rotate() {
  const newValue = ((this.transform.rotate ?? 0) + 90) % 360;
  this.transform = {
    ...this.transform,
    rotate: newValue
  }
}
flipHorizontal() {
  this.transform = {
    ...this.transform,
    flipH: !this.transform.flipH
  }
}
flipVertical() {
  this.transform = {
    ...this.transform,
    flipV: !this.transform.flipV
  }
}
```

HTML template

```html
<ion-button (click)="selectImage()" *ngIf="!myImage">
<image-cropper
  #cropper
  [autoCrop]="false"
  [imageBase64]="myImage"
  [hideResizeSquares]="isMobile"
  [maintainAspectRatio]="true"
  [aspectRatio]="1 / 1"
  format="png"
  (imageLoaded)="imageLoaded()"
  (loadImageFailed)="loadImageFailed()"
  [transform]="transform"
></image-cropper>
<img [src]="croppedImage" *ngIf="croppedImage">
```

## Google Cloud Media CDN

> Notes from current attempt to setup video streaming for the app.

Install gcloud CLI: <https://cloud.google.com/sdk/docs/install>

Run ```gcloud cheat-sheet``` or refer to the gcloud command-line tool cheat
    sheet: <https://cloud.google.com/sdk/docs/cheatsheet>

### Google Cloud CLI Setup

Login to google cloud:

```bash
gcloud auth login
```

Select project:

```bash
gcloud projects list
gcloud config set project PROJECT_ID
```

Enable network services API (or with console):

```bash
gcloud services enable networkservices.googleapis.com
```

Enable crertificate manager API:

```bash
gcloud services enable certificatemanager.googleapis.com
```

I am currently unable to see the Media CDN setup page, it is blank and doesn't appear in the side menu, it seems to be disabled and have been looking for a way to enable it.
