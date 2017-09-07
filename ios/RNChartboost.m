#import "RNChartboost.h"

@implementation RNChartboost

RCTResponseSenderBlock didInitializeCallback;
RCTResponseSenderBlock showCallbacks;
RCTResponseSenderBlock cacheCallbacks;


RCT_EXPORT_MODULE();

//////////////////////////////////////////////////////////////////////
// Methods

RCT_EXPORT_METHOD(start: (NSString *)appID : (NSString *)signature : (RCTResponseSenderBlock)callback) {
    didInitializeCallback = callback;
    [Chartboost startWithAppId:appID appSignature:signature delegate:self];
}

RCT_EXPORT_METHOD(showInterstitial: (NSString *)location : (NSArray *)callbacks) {
    showCallbacks = callback;
    [Chartboost showInterstitial:location];
}

RCT_EXPORT_METHOD(cacheInterstitial: (NSString *)location : (RCTResponseSenderBlock)callbacks) {
    cacheCallbacks = callback;
    [Chartboost cacheInterstitial:location];
}

RCT_EXPORT_METHOD(hasInterstitial: (NSString *)location :  (RCTResponseSenderBlock)callback) {
    BOOL has = [Chartboost hasInterstitial:location];
    callback(@[has]);
}



//////////////////////////////////////////////////////////////////////
// Delegate Methods

- (void)didInitialize:(BOOL)status {
    didInitializeCallback(@[status]);
}

- (BOOL)shouldDisplayInterstitial:(CBLocation)location {
    
}

- (void)didDisplayInterstitial:(CBLocation)location {
    
}

- (void)didCacheInterstitial:(CBLocation)location  {
    
}

- (void)didFailToLoadInterstitial:(CBLocation)location withError:(CBLoadError)error {
    
}

- (void)didDismissInterstitial:(CBLocation)location {
    
}

- (void)didCloseInterstitial:(CBLocation)location {
    
}

- (void)didClickInterstitial:(CBLocation)location {
    
}
