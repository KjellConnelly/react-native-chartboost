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
		Chartboost.start("5403bd3889b0bb6d9ff085b1", "47c2ddfe01dd7c4e535ae15902dd85ec70bdb672", (success)=>{
			this.setState({chartboostStarted:success})
		})
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
