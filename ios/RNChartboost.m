#import "RNChartboost.h"

@implementation RNChartboost

RCTResponseSenderBlock didInitializeCallback;
NSMutableDictionary *showCallbacks = nil;
NSMutableDictionary *cacheCallbacks = nil;


RCT_EXPORT_MODULE();

//////////////////////////////////////////////////////////////////////
// Methods

RCT_EXPORT_METHOD(start: (NSString *)appID : (NSString *)signature : (RCTResponseSenderBlock)callback) {
    didInitializeCallback = callback;
    [Chartboost startWithAppId:appID appSignature:signature delegate:self];
}

RCT_EXPORT_METHOD(showInterstitial: (NSString *)location : (NSDictionary *)callbacks) {
    RCTResponseSenderBlock cb1 = [callbacks objectForKey:@"didDismissInterstitial"];
    showCallbacks = [self convertDictionaryOfFunctions:callbacks];
    
    [Chartboost showInterstitial:location];
}

RCT_EXPORT_METHOD(cacheInterstitial: (NSString *)location : (NSDictionary *)callbacks) {
    cacheCallbacks = [self convertDictionaryOfFunctions:callbacks];
    [Chartboost cacheInterstitial:location];
}

RCT_EXPORT_METHOD(hasInterstitial: (NSString *)location :  (RCTResponseSenderBlock)callback) {
    NSNumber *has = [NSNumber numberWithBool:[Chartboost hasInterstitial:location]];
    callback(@[has]);
}



//////////////////////////////////////////////////////////////////////
// Delegate Methods

// Initialize
- (void)didInitialize:(BOOL)status {
    didInitializeCallback(@[[NSNumber numberWithBool:status]]);
}

// Show Interstitial

- (void)didDisplayInterstitial:(CBLocation)location {
    if (showCallbacks != nil) {
        RCTResponseSenderBlock callback = [showCallbacks valueForKey:@"didDisplayInterstitial"];
        //callback(@[]);
        
        callback(@[
                   [NSNull null],
                   ]);
    }
}

- (void)didFailToLoadInterstitial:(CBLocation)location withError:(CBLoadError)error {
    if (showCallbacks != nil) {
        RCTResponseSenderBlock callback = [showCallbacks valueForKey:@"didFailToLoadInterstitial"];
        callback(@[]);
    }
}

- (void)didDismissInterstitial:(CBLocation)location {
    if (showCallbacks != nil) {
        RCTResponseSenderBlock callback = [showCallbacks valueForKey:@"didDismissInterstitial"];
        callback(@[]);
    }
}

- (void)didCloseInterstitial:(CBLocation)location {
    if (showCallbacks != nil) {
        RCTResponseSenderBlock callback = [showCallbacks valueForKey:@"didCloseInterstitial"];
        callback(@[]);
    }
}

- (void)didClickInterstitial:(CBLocation)location {
    if (showCallbacks != nil) {
        RCTResponseSenderBlock callback = [showCallbacks valueForKey:@"didClickInterstitial"];
        callback(@[]);
    }
}

// Cache Interstitial
- (void)didCacheInterstitial:(CBLocation)location  {
    if (cacheCallbacks != nil) {
        RCTResponseSenderBlock callback = [cacheCallbacks valueForKey:@"didCacheInterstitial"];
        callback(@[]);
    }
}

// Helper

- (NSMutableDictionary *) convertDictionaryOfFunctions : (NSDictionary *) functions {
    NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
    for (NSString* key in functions) {
        [dict setValue:(RCTResponseSenderBlock)[functions objectForKey:key] forKey:key];
    }
    return dict;
}

- (void) alert : (NSString *) message {
    UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Alert" message:message preferredStyle:UIAlertControllerStyleAlert];
    [alert addAction:[UIAlertAction actionWithTitle:@"Ok" style:UIAlertActionStyleDefault handler:nil]];
    [[[[UIApplication sharedApplication] keyWindow] rootViewController] presentViewController:alert animated:true completion:nil];
}

@end
