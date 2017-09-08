import {NativeModules} from 'react-native'

const RNChartboost = NativeModules.RNChartboost

export default class Chartboost {
	static start(appID, signature, callback) {
		RNChartboost.start(appID, signature, (success)=>{
			callback(success)
		})
	}

	static showInterstitial(location, callbacks) {
		const updatedCallbacks = Chartboost.showInt_EmptyCallbacks(callbacks)
    RNChartboost.showInterstitial(location, updatedCallbacks)
	}

	static cacheInterstitial(location, callbacks) {
		const updatedCallbacks = Chartboost.cache_EmptyCallbacks(callbacks)
    RNChartboost.cacheInterstitial(location, updatedCallbacks)
	}

	static hasInterstitial(location, callback) {
		RNChartboost.hasInterstitial(location, has=>{
			callback(has)
		})
	}

	// helper functions
	static showInt_EmptyCallbacks(input) {
		let callbacks = JSON.parse(JSON.stringify(input))
		let keys = [
			"didDisplayInterstitial",
			"didFailToLoadInterstitial",
			"didDismissInterstitial",
			"didCloseInterstitial",
			"didClickInterstitial"
		]
		keys.forEach(key=>{
			if (callbacks[key] == undefined){
				callbacks[key] = ()=>{}
			}
		})
		return callbacks
	}

	static cache_EmptyCallbacks(input) {
		let callbacks = JSON.parse(JSON.stringify(input))
		let keys = [
			"didCacheInterstitial",
		]
		keys.forEach(key=>{
			if (callbacks[key] == undefined){
				callbacks[key] = ()=>{}
			}
		})
		return callbacks
	}
}
