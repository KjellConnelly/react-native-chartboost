//
//  RNChartboost.h
//
//  Created by Kjell Connelly on 9/7/17.
//  Copyright © 2017 POP POP LLC. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
    #import "RCTBridgeModule.h"
    #import "RCTConvert.h"
#else
    #import <React/RCTBridgeModule.h>
    #import <React/RCTConvert.h>
#endif

#import <UIKit/UIKit.h>
#import <Chartboost/Chartboost.h> 

//"/Users/Developer/Desktop/iOSApps/DBT/DBT_React/ios/Chartboost.framework/Headers/Chartboost.h"

@interface RNChartboost : NSObject <RCTBridgeModule, ChartboostDelegate>

@end
