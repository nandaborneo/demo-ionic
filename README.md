## after cloning

    npm install
    
    ionic cordova plugin add https://github.com/nandaborneo/cordova-imagePicker.git
    
    npm install @ionic-native/image-picker@4 => for ionic 2/3
    
    ionic cordova plugin add cordova-plugin-android-permissions
    
    npm install @ionic-native/android-permissions@4
    
    ionic cordova plugins rm cordova-plugin-ionic-webview => remove if exists
    
    ionic cordova plugins add cordova-plugin-ionic-webview@1.2.1 
    
    ionic cordova plugin add cordova-plugin-crop
    
    npm install @ionic-native/crop@4
    
    ionic cordova plugin add cordova-plugin-camera
    
    npm install @ionic-native/camera@4

## After above syntax has done running please update this file
Open file `index.d.ts` at <project-name>/node_modules/@ionic-native/image-picker/index.d.ts
and add this code `listPrevious?: string;` below line:25 like below
  
    outputType?: number;
    listPrevious?: string; => this should be added
