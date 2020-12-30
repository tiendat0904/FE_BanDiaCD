/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  BASE_API_URL: 'http://127.0.0.1:8000/',
  BASE_API: 'api/',
  firebaseConfig : {
    apiKey: "AIzaSyARNWnnLK-xK-w1T3xLBEa66gFXacmOknc",
    authDomain: "upload-image-904a9.firebaseapp.com",
    databaseURL: "https://upload-image-904a9.firebaseio.com",
    projectId: "upload-image-904a9",
    storageBucket: "upload-image-904a9.appspot.com",
    messagingSenderId: "1070332782714",
    appId: "1:1070332782714:web:c175dddefd7a18342133c3",
    measurementId: "G-K336XGQP6D"
  }
};

export const avatarDefault = "https://firebasestorage.googleapis.com/v0/b/upload-image-904a9.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=4cf88b6c-db6d-4c76-86c6-e049f5fa901c";
