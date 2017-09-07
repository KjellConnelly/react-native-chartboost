
# react-native-chartboost

## Not Ready
This package is not ready yet and has not been throughly tested. Do not use it until this disclaimer has been removed.

## Getting started

`$ npm install react-native-chartboost --save`

### Mostly automatic installation

`$ react-native link react-native-chartboost`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-chartboost` and add `RNChartboost.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNChartboost.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<








##### The rest of this README is bogus. Android and Windows is not currently supported.

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNChartboostPackage;` to the imports at the top of the file
  - Add `new RNChartboostPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-chartboost'
  	project(':react-native-chartboost').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-chartboost/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-chartboost')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNChartboost.sln` in `node_modules/react-native-chartboost/windows/RNChartboost.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Com.Reactlibrary.RNChartboost;` to the usings at the top of the file
  - Add `new RNChartboostPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNChartboost from 'react-native-chartboost';

// TODO: What to do with the module?
RNChartboost;
```
  
