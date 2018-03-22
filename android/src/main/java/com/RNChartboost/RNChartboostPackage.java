
package com.RNChartboost;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

import com.chartboost.sdk.Chartboost;
import android.app.Activity;

public class RNChartboostPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Arrays.<NativeModule>asList(new RNChartboostModule(reactContext));
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  public static void ONCREATE(Activity activity, String appId, String appSignature) {
    Chartboost.startWithAppId(activity, appId, appSignature);
    Chartboost.onCreate(activity);
    Chartboost.onStart(activity);
  }

  public static void ONSTART(Activity activity) {
    Chartboost.onStart(activity);
  }

  public static void ONRESUME(Activity activity) {
    Chartboost.onResume(activity);
  }

  public static void ONPAUSE(Activity activity) {
    Chartboost.onPause(activity);
  }

  public static void ONSTOP(Activity activity) {
    Chartboost.onStop(activity);
  }

  public static void ONDESTROY(Activity activity) {
    Chartboost.onDestroy(activity);
  }

  public static boolean ONBACKPRESSED() {
    return Chartboost.onBackPressed();
  }
}
