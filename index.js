import {NativeModules, NativeEventEmitter} from 'react-native'

const RNChartboost = NativeModules.RNChartboost
const keys = [
	"didDisplayInterstitial",
	"didFailToLoadInterstitial",
	"didDismissInterstitial",
	"didCloseInterstitial",
	"didClickInterstitial",
	"didCacheInterstitial",
]

export default class Chartboost {
	static start(appID, signature, callback) {
		RNChartboost.start(appID, signature, (success)=>{
			callback(success)
		})
	}

	static setDelegateMethods(callbacks) {
		const eventEmitter = new NativeEventEmitter(RNChartboost)
		keys.forEach(key=>{
			if (callbacks[key] != undefined){
				const subscription = eventEmitter.addListener(key, callbackData=>{
					const location = callbackData[1]
					if (callbacks[key]) {
						callbacks[key](callbackData.location)
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
