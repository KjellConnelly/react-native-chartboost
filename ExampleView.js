import React, { Component } from 'react'
import { View, Button, TouchableOpacity, Text, Platform, ScrollView} from 'react-native'
import Chartboost from './index'
// you will import Chartboost from 'react-native-chartboost'

export default class ExampleView extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			chartboostStarted:undefined,
			manyCallbacksStatus:"...",
			interstitialCached:"Not manually cached",
		}
	}

	componentDidMount() {
		Chartboost.start("5403bd3889b0bb6d9ff085b1", "47c2ddfe01dd7c4e535ae15902dd85ec70bdb672", (success)=>{
			this.setState({chartboostStarted:success})
		})
	}

	render() {
		return (
			<View style={{flex:1}}>
			<ScrollView>
				<Text style={{marginTop:20,textAlign:"center"}}>
					{this.state.chartboostStarted ? "Chartboost has successfully loaded" :
						(this.state.chartboostStarted == false ? "Chartboost failed to load" : "Loading Chartboost. . .")}
				</Text>
				{(this.state.chartboostStarted == true) &&
					<View>
						<View style={styles.piece}>
							<Button title="Show Interstitial (many callbacks)" onPress={()=>{
								Chartboost.showInterstitial("My Location", {
									shouldDisplayInterstitial:()=>{
										this.setState({manyCallbacksStatus:"Should display Interstitial"})
									},
									didDisplayInterstitial:()=>{
										this.setState({manyCallbacksStatus:"Did Display Interstitial"})
									},
									didFailToLoadInterstitial:()=>{
										this.setState({manyCallbacksStatus:"Failed to load Interstitial"})
									},
									didDismissInterstitial:()=>{
										this.setState({manyCallbacksStatus:"Interstitial dismissed"})
									},
									didCloseInterstitial:()=>{
										this.setState({manyCallbacksStatus:"Interstitial closed"})
									},
									didClickInterstitial:()=>{
										this.setState({manyCallbacksStatus:"Interstitial clicked - You rich!"})
									},
								})
							}} />
							<Text style={{textAlign:"center",color:"red",fontSize:16}}>
								Many Callbacks Status:
							</Text>
							<Text style={{textAlign:"center",fontSize:14,marginBottom:14}}>
								{this.state.manyCallbacksStatus}
							</Text>
						</View>
						<View style={styles.piece}>
							<Button title="Show Interstitial (no callbacks)" onPress={()=>{
								Chartboost.showInterstitial("My Location", {})
							}} />
						</View>
						<View style={styles.piece}>
							<Button title="Cache Interstitial" onPress={()=>{
								Chartboost.cacheInterstitial("My Location", {
									didCacheInterstitial:()=>{
										this.setState({interstitialCached:"Successfully Cached"})
									}
								})
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
