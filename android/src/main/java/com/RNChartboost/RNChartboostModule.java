
package com.RNChartboost;

// Default RN imports
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

// Chartboost
import com.chartboost.sdk.Chartboost;
import com.chartboost.sdk.CBLocation;
import com.chartboost.sdk.ChartboostDelegate;

import com.chartboost.sdk.Libraries.CBLogging;
import com.chartboost.sdk.Model.CBError;

// Other Imports
import android.app.Activity;

public class RNChartboostModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNChartboostModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNChartboost";
  }

  @ReactMethod
  public void start(String appID, String signature) {
    System.out.println("react-native-chartboost's android start() function does nothing in Android. Make sure you setup your MainActivity.java properly if you haven't already.");
    /* The following code theoretically should work, but since it's not in the onCreate() method, it doesn't work.

    Activity activity = getCurrentActivity();
    Chartboost.startWithAppId(getCurrentActivity(), appID, signature);
    Chartboost.setDelegate(delegate);
    Chartboost.onCreate(getCurrentActivity());
    */
  }

  @ReactMethod
  public void showInterstitial(String location) {
    Chartboost.showInterstitial(CBLocation.LOCATION_DEFAULT);
    System.out.println("showInterstitial: " + location + " " + getCurrentActivity());
  }

  public void addToUILog(final String message) {
    System.out.println(message);
  }

  public ChartboostDelegate delegate = new ChartboostDelegate() {

      @Override
      public boolean shouldRequestInterstitial(String location) {
          addToUILog("Should request interstitial at " + location + "?");
          return true;
      }

      @Override
      public boolean shouldDisplayInterstitial(String location) {
          addToUILog("Should display interstitial at " + location + "?");
          return true;
      }

      @Override
      public void didCacheInterstitial(String location) {
          addToUILog("Interstitial cached at " + location);
      }

      @Override
      public void didFailToLoadInterstitial(String location, CBError.CBImpressionError error) {
          addToUILog("Interstitial failed to load at " + location + " with error: " + error.name());
      }

      @Override
      public void willDisplayInterstitial(String location) {
          addToUILog("Will display interstitial at " + location);
      }

      @Override
      public void didDismissInterstitial(String location) {
          addToUILog("Interstitial dismissed at " + location);
      }

      @Override
      public void didCloseInterstitial(String location) {
          addToUILog("Interstitial closed at " + location);
      }

      @Override
      public void didClickInterstitial(String location) {
          addToUILog("Interstitial clicked at " + location );
      }

      @Override
      public void didDisplayInterstitial(String location) {
          addToUILog("Interstitial displayed at " + location);
      }

      @Override
      public void didFailToRecordClick(String uri, CBError.CBClickError error) {
          addToUILog("Failed to record click " + (uri != null ? uri : "null") + ", error: " + error.name());
      }

      @Override
      public boolean shouldDisplayRewardedVideo(String location) {
          addToUILog("Should display rewarded video at " + location + "?");
          return true;
      }

      @Override
      public void didCacheRewardedVideo(String location) {
          addToUILog("Did cache rewarded video " + location);
      }

      @Override
      public void didFailToLoadRewardedVideo(String location, CBError.CBImpressionError error) {
          addToUILog("Rewarded Video failed to load at " + location + " with error: " + error.name());
      }

      @Override
      public void didDismissRewardedVideo(String location) {
          addToUILog("Rewarded video dismissed at " + location);
      }

      @Override
      public void didCloseRewardedVideo(String location) {
          addToUILog("Rewarded video closed at " + location);
      }

      @Override
      public void didClickRewardedVideo(String location) {
          addToUILog("Rewarded video clicked at " + location);
      }

      @Override
      public void didCompleteRewardedVideo(String location, int reward) {
          addToUILog("Rewarded video completed at " + location + "for reward: " + reward);
      }

      @Override
      public void didDisplayRewardedVideo(String location) {
          addToUILog("Rewarded video displayed at " + location);
      }

      @Override
      public void willDisplayVideo(String location) {
          addToUILog("Will display video at " + location);
      }

      @Override
      public void didCacheInPlay(String location) {
          addToUILog("In Play loaded at " + location);
      }

      @Override
      public void didFailToLoadInPlay(String location, CBError.CBImpressionError error) {
          addToUILog("In play failed to load at " + location + ", with error: " + error);
      }

      @Override
      public void didInitialize() {
        addToUILog("Chartboost SDK is initialized and ready!");
        sendEvent(this.reactContext, "didInitialize", true);
      }
  };
}
