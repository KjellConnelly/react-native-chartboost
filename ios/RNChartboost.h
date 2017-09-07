//
//  RNChartboost.h
//
//  Created by Kjell Connelly on 9/7/17.
//  Copyright © 2017 POP POP LLC. All rights reserved.
//

#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <Chartboost/Chartboost.h>

@interface RNChartboost : NSObject <RCTBridgeModule, ChartboostDelegate>

@end
