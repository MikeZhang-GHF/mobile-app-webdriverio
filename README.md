# devops-mobile-app-test-framework-js-template
This is DevOps Mobile App Test Automation Framework in JavaScript

### Setup the environment
- Install nodejs
- Install appium
- Install appium drivers and plugins
- Install appium-desktop for object spy
- Install android studio if you want to run tests on Android locally

### WebdriverIO Setup
- Go to the project folder
```sh
npm init wdio .
```
- Follow the instructions to setup the project from WebdriverIO
> Choose Mocha if you run keyword driven tests
> Choose Cucumber if you run BDD tests
> No compiler
> Choose **appium** as the service to your test setup
> Yes to run `npm install`

#### Run Appium Server Locally
- Run appium server
```sh
appium -p 4724
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
