# devops-mobile-app-test-framework-js-template
This is DevOps Mobile App Test Automation Framework in JavaScript

### Setup the environment
- Install nodejs
- Install appium
- Install appium drivers and plugins
- Install appium-desktop
- Install android studio

#### Run Appium Server
- Run appium server
```sh
appium -p 4724
```

```sh
appium server -pa /wd/hub
```

### Config Test Environment
 - Under config folder, edit the config file to set the test environment, you can refer to wdio.android.conf.js and wdio.ios.conf.js for your android and ios test environment.
 - Under config folder, if you would like to connect your device cloud provider, you can refer to wdio.



### Run Test Cases

- Run tests on local
```sh
npx wdio config/local/wdio.android.conf.js
npx wdio config/local/wdio.ios.conf.js
```

- Run tests on device clouds
```sh 
npx wdio config/device_cloud/wdio.android.bitbar.conf.js 
npx wdio config/device_cloud/wdio.ios.bitbar.conf.js 

npx wdio config/device_cloud/wdio.android.perfecto.conf.js 
npx wdio config/device_cloud/wdio.ios.perfecto.conf.js 
```
