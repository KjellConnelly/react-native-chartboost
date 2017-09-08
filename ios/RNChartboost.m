#import "RNChartboost.h"

@implementation RNChartboost

RCTResponseSenderBlock didInitializeCallback;

- (NSArray<NSString *> *)supportedEvents {
    return @[@"didDisplayInterstitial",
             @"didFailToLoadInterstitial",
             @"didDismissInterstitial",
             @"didCloseInterstitial",
             @"didClickInterstitial",
             @"didCacheInterstitial"];
}


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(start: (NSString *)appID : (NSString *)signature : (RCTResponseSenderBlock)callback) {
    didInitializeCallback = callback;
    [Chartboost startWithAppId:appID appSignature:signature delegate:self];
}

RCT_EXPORT_METHOD(showInterstitial: (NSString *)location) {
    [Chartboost showInterstitial:location];
}

RCT_EXPORT_METHOD(cacheInterstitial: (NSString *)location) {
    [Chartboost cacheInterstitial:location];
}

RCT_EXPORT_METHOD(hasInterstitial: (NSString *)location :  (RCTResponseSenderBlock)callback) {
    NSNumber *has = [NSNumber numberWithBool:[Chartboost hasInterstitial:location]];
    callback(@[has]);
}

//////////////////////////////////////////////////////////////////////
// Delegate Methods

- (void)didInitialize:(BOOL)status {
    didInitializeCallback(@[[NSNumber numberWithBool:status]]);
}

- (void)didDisplayInterstitial:(CBLocation)location {
    [self delegateCallback:@"didDisplayInterstitial" :location];
}

- (void)didFailToLoadInterstitial:(CBLocation)location withError:(CBLoadError)error {
    [self delegateCallback:@"didFailToLoadInterstitial" :location];
}

- (void)didDismissInterstitial:(CBLocation)location {
    [self delegateCallback:@"didDismissInterstitial" :location];
}

- (void)didCloseInterstitial:(CBLocation)location {
    [self delegateCallback:@"didCloseInterstitial" :location];
}

- (void)didClickInterstitial:(CBLocation)location {
    [self delegateCallback:@"didClickInterstitial" :location];
}

- (void)didCacheInterstitial:(CBLocation)location  {
    [self delegateCallback:@"didCacheInterstitial" :location];
}

// Helper
- (void) delegateCallback : (NSString *) methodName : (CBLocation) location {
    [self sendEventWithName:methodName body:@{@"location": location}];
}

@end
