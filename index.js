import {NativeModules, NativeEventEmitter, DeviceEventEmitter, Platform} from 'react-native'

const RNChartboost = NativeModules.RNChartboost
const keys = [
	"didInitialize",
	"didDisplayInterstitial",
	"didFailToLoadInterstitial",
	"didDismissInterstitial",
	"didCloseInterstitial",
	"didClickInterstitial",
	"didCacheInterstitial",
]

export default class Chartboost {
	static start(appID, signature) {
		RNChartboost.start(appID, signature);
	}

	static setDelegateMethods(callbacks) {
		const eventEmitter = Platform.OS == 'ios' ? new NativeEventEmitter(RNChartboost) : DeviceEventEmitter
		keys.forEach(key=>{
			if (callbacks[key] != undefined){
				const subscription = eventEmitter.addListener(key, callbackData=>{
					if (callbacks[key]) {
						if (key == "didInitialize") {
							callbacks[key](callbackData.initSuccessful)
						} else {
							callbacks[key](callbackData.location)
						}
					}
				})
			}
		})
	}

	static showInterstitial(location) {
    RNChartboost.showInterstitial(location)
	}

	static cacheInterstitial(location) {
    RNChartboost.cacheInterstitial(location)
	}

	static hasInterstitial(location, callback) {
		RNChartboost.hasInterstitial(location, has=>{
			callback(has)
		})
	}
}
