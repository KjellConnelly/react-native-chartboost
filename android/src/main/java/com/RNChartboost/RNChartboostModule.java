
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
    final Activity activity = getCurrentActivity();
    Chartboost.startWithAppId(activity, appID, signature);
    Chartboost.onCreate(activity);
  }

  @ReactMethod
  public void showInterstitial(String location) {
    Chartboost.showInterstitial(location);
  }
}
