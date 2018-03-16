//
//  RNChartboost.h
//
//  Created by Kjell Connelly on 9/7/17.
//  Copyright © 2017 POP POP LLC. All rights reserved.
//



#if __has_include(<React/RCTBridgeModule.h>)
  #import <React/RCTBridgeModule.h>
  #import <React/RCTConvert.h>
  #import <React/RCTEventEmitter.h>
#elif __has_include("RCTBridgeModule.h")
  #import "RCTBridgeModule.h"
  #import "RCTConvert.h"
  #import "RCTEventEmitter.h"
#else
  #import "RCTBridgeModule.h"
  #import "RCTConvert.h"
  #import "RCTEventEmitter.h"
#endif

#import <UIKit/UIKit.h>
#import <Chartboost/Chartboost.h>

// "/Users/Developer/Desktop/iOSApps/DBT/DBT_React/ios/Chartboost.framework/Headers/Chartboost.h"

@interface RNChartboost : RCTEventEmitter <RCTBridgeModule, ChartboostDelegate>

@end
