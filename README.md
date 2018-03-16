
# react-native-chartboost

#### Chartboost SDK Tested with 7.0 (9/8/17)

#### Works for:
| iOS | Android | Windows |
|----|----|----|
| Yes | Soon | Probably never |

#### Displays:
| Interstitial Images | Interstitial Videos | Reward Videos | Banners |
| ------------------- | ------------------- | ------------- | ------- |
| Yes | Yes (if you configure it in your Chartboost Dashboard | Yes and no. We don't have an official API to use Chartboost's reward videos. But you can make your own if you setup the logic yourself and simply display Interstitial Videos | No. Chartboost doesn't offer these. |

![alt text](https://raw.githubusercontent.com/kjellconnelly/react-native-chartboost/master/ExampleView_ios.gif "ExampleView iOS")

## Getting started
- Disclaimer: This package has many steps to get running. Not only do you have to install this package, but also Chartboost, setup an account/app with them. You also need to make sure dependencies are working within Xcode (iOS users) which may be a problem all in itself as Xcode has a lot of quirks.
#### Step 1: install/save NPM package
`$ npm install react-native-chartboost --save`

#### Step 2: Link using automatic method, or manual:
###### Automated Method (one iOS project target only):
`$ react-native link react-native-chartboost`
###### Manual iOS Method
1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-chartboost` and add `RNChartboost.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNChartboost.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. If you have more than one target, repeat step 3 for each target.
###### Manual Android Method
1. Open up `android/app/src/main/java/[...]/MainActivity.java`
- Add `import com.RNChartboost.RNChartboostPackage;` to the imports at the top of the file
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
###### Manual Windows Method: Windows not supported yet
#### Step 3: Add the Chartboost framework to your project
- Download the SDK for the Platforms you are using the follow their integration steps: https://answers.chartboost.com/en-us/articles/download or https://www.chartboost.com
- When you have downloaded the SDK, unzip it. For iOS users, drag Chartboost.framework into your_project/ios. Then drag that into Xcode. Make sure it is in the Link Binary with Libraries part too. If not automatically put there, drag from within Xcode to that part.
- You will to do most of their steps except writing any native code. You will our javascript API to run these methods. The steps may include linking frameworks like UIKit and CoreGraphics. You might even need to link WebKit.framework.
- Remember to ignore any step that involve writing any native code (such as Objective C or Swift).

Here is what my Link Binary With Libraries section looks like:
![alt text](https://raw.githubusercontent.com/kjellconnelly/react-native-chartboost/master/xcodeLink.png "Link Binary with Libraries")

#### Step 4: Make sure to have a Chartboost Account, Added an App to the Dashboard, and have an active publishing campaign
- You will need all of these things in order to make money.
- This might take half an hour or longer. It's a bit confusing. Especially if you have never used an adnetwork before.
- If you're starting a completely new account, you may need financial info ready such as TIN or SSN. You'll be using these to setup payments from Chartboost.

## Javascript API
#### Static Functions, only use ONCE
| function | example | notes |
| -------- | ------- | ----- |
|start(appID, signature) | `Chartboost.start("54eq1", "47c2ddf") ` | Get your appID and signature from the Chartboost dashboard. Make sure to setDelegateMethods first to get notified if initialization is successful.
| setDelegateMethods(callbacks)| `Chartboost.setDelegateMethods({ didCacheInterstitial:()=>{ console.log("Successfully Cached"}})` | You can ignore this function if you don't care about being notified when certain things happen. Or you can add 1, 2, or any number of keys/values to this object for different events. Different events are explained below |

| setDelegateMethods supported events | notes |
| ----------------------------------- | ----- |
| didInitialize | Called when it has been initialized. Sometimes is called more than once (like when it was called, and then a permissions for camera use popup happened). |
| didDisplayInterstitial | Called after an interstitial has been displayed on the screen. |
| didFailToLoadInterstitial | Called after an interstitial has attempted to load from the Chartboost API servers but failed. |
| didDismissInterstitial | Called after an interstitial has been dismissed. |
| didCloseInterstitial | Called after an interstitial has been closed. |
| didClickInterstitial | Called after an interstitial has been clicked. |
| didCacheInterstitial | Called after an interstitial has been loaded from the Chartboost API servers and cached locally. |
*** Difference between didDismiss and didClose? When a user tap the X to close the ad, it fires both `didCloseInterstitial` and `didDismissInterstitial`. When a user taps the ad (and is taken to the AppStore), it fires both `didClickInterstitial` and `didDismissInterstitial`. So didDismiss is fired both times, so resume music/animations/whatever here. If you want to track if they clicked, or closed, then you can using the didClick/didClose events. I personally never use didClick/didClose.

#### Static functions, use after start() has been called

| function | example | notes |
| -------- | ------- | ----- |
| showInterstitial(location) | `Chartboost.showInterstitial("EndOfLevel")` | We recommend caching interstitials first. Otherwise, there may be a slight delay before you are able to display them |
| cacheInterstitial(location) | `Chartboost.cacheInterstitial("EndOfLevel")` | Caching will help improve performance. Preferably cache a few seconds to a minute before you will be showing the interstitial to reduce data usage, and improve performance. |
*** what is location? This is a string you will use to when it comes to tracking ads. You could pass in an empty string even, but if you want to see more accurate statistics on the Chartboost dashboard, enter in proper strings to help you understand your audience better.

## Example Usage
```javascript
import React, { Component } from 'react'
import { View, Button, TouchableOpacity, Text, Platform, ScrollView, StatusBar} from 'react-native'
import Chartboost from './index'
// you will import Chartboost from 'react-native-chartboost'

export default class ExampleView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			chartboostStarted:undefined,
			manyCallbacksStatus:"...",
			interstitialCached:"Not manually cached",
			statusBarHidden:false,
		}
	}

	componentDidMount() {
		Chartboost.setDelegateMethods({
			didInitialize:(initSuccessful)=>{
				this.setState({initSuccessful:initSuccessful})
		      	},
			didCacheInterstitial:(location)=>{
				this.setState({interstitialCached:"Successfully Cached: " + location})
			},
			didDisplayInterstitial:(location)=>{
				this.setState({manyCallbacksStatus:"Did Display Interstitial",statusBarHidden:true})
			},
			didFailToLoadInterstitial:(location)=>{
				this.setState({manyCallbacksStatus:"Failed to load Interstitial"})
			},
			didDismissInterstitial:(location)=>{
				this.setState({manyCallbacksStatus:"Interstitial dismissed",statusBarHidden:false})
			},
			didCloseInterstitial:(location)=>{
				this.setState({manyCallbacksStatus:"Interstitial closed",statusBarHidden:false})
			},
			didClickInterstitial:(location)=>{
				this.setState({manyCallbacksStatus:"Interstitial clicked - You rich!",statusBarHidden:false})
			}
		})
		Chartboost.start("5403bd3889b0bb6d9ff085b1", "47c2ddfe01dd7c4e535ae15902dd85ec70bdb672")
	}

	render() {
		return (
			<View style={{flex:1}}>
				<StatusBar hidden={this.state.statusBarHidden} />
				<ScrollView>
					<Text style={{marginTop:20,textAlign:"center"}}>
						{this.state.chartboostStarted ? "Chartboost has successfully loaded" :
							(this.state.chartboostStarted == false ? "Chartboost failed to load" : "Loading Chartboost. . .")}
					</Text>
					{(this.state.chartboostStarted == true) &&
						<View>
							<View style={styles.piece}>
								<Button title="Show Interstitial" onPress={()=>{
									Chartboost.showInterstitial("My Location")
								}} />
								<Text style={{textAlign:"center",color:"red",fontSize:16}}>
									Callbacks Status:
								</Text>
								<Text style={{textAlign:"center",fontSize:14,marginBottom:14}}>
									{this.state.manyCallbacksStatus}
								</Text>
							</View>
							<View style={styles.piece}>
								<Button title="Cache Interstitial" onPress={()=>{
									this.setState({interstitialCached:"Caching..."})
									Chartboost.cacheInterstitial("My Location")
								}} />
								<Text style={{textAlign:"center"}}>
									{this.state.interstitialCached}
								</Text>
							</View>
						</View>
					}
				</ScrollView>
			</View>
		)
	}
}

const styles = {
	piece: {
		padding:4,
		marginVertical:16,
		marginHorizontal:8,
		backgroundColor:"rgb(179, 179, 179)",
		borderRadius:8,
	}
}
```
