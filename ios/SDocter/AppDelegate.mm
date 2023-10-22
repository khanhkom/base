#import "AppDelegate.h"
#import "RNBootSplash.h"
#import <Firebase.h>
#import "Orientation.h"

#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>
#import <FBSDKCoreKit/FBSDKCoreKit-swift.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h> // <- Add This Import
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>


#import <PushKit/PushKit.h>
#import "RNVoipPushNotificationManager.h"
#import "RNCallKeep.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"SDocter";

  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [super application:application didFinishLaunchingWithOptions:launchOptions];
  [FIRApp configure];
   [[FBSDKApplicationDelegate sharedInstance] application:application
                       didFinishLaunchingWithOptions:launchOptions];
  // RN BootSplash
  UIView *rootView = self.window.rootViewController.view; // react-native >= 0.71 specific
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView];
  [RNVoipPushNotificationManager voipRegistration];


  return YES;
}

/* Add PushKit delegate method */

// --- Handle updated push credentials
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(PKPushType)type {
  // Register VoIP push token (a property of PKPushCredentials) with server
  [RNVoipPushNotificationManager didUpdatePushCredentials:credentials forType:(NSString *)type];
}

// --- Handle incoming pushes (for ios <= 10)
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type {
  [RNVoipPushNotificationManager didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
}

// --- Handle incoming pushes (for ios >= 11)
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
  NSLog(@"Thinhnt didReceiveIncomingPushWithPayload có complete: %@", payload.dictionaryPayload);

  NSDictionary *payloadDataDic = payload.dictionaryPayload[@"data"][@"map"][@"data"][@"map"];
  NSString *callId = payloadDataDic[@"callId"];
  NSNumber *serial = payloadDataDic[@"serial"];
  NSString *callStatus = payloadDataDic[@"callStatus"];

  NSString *fromAlias = payloadDataDic[@"from"][@"map"][@"alias"];
  NSString *fromNumber = payloadDataDic[@"from"][@"map"][@"number"];
  NSString *callName = fromAlias != NULL ? fromAlias : fromNumber != NULL ? fromNumber : @"Connecting...";

  NSString *uuid = [[[NSUUID UUID] UUIDString] lowercaseString];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] init];
  [dict setObject:uuid forKey:@"uuid"];
  [dict setObject:serial forKey:@"serial"];
  [dict setObject:callId forKey:@"callId"];

  // --- You should make sure to report to callkit BEFORE execute `completion()`
  if (callId != NULL && [callStatus isEqual: @"started"]) {
    // --- Process the received push
    [[NSNotificationCenter defaultCenter] postNotificationName:@"voipRemoteNotificationReceived" object:self userInfo:dict];
    
    [RNCallKeep reportNewIncomingCall: uuid
                                 handle: @"Stringee"
                             handleType: @"generic"
                               hasVideo: true
                    localizedCallerName: @"Bác sĩ"
                        supportsHolding: YES
                           supportsDTMF: YES
                       supportsGrouping: YES
                     supportsUngrouping: YES
                            fromPushKit: YES
                                payload: nil
                  withCompletionHandler: completion];
    


  } else {
    // Show fake call
    NSLog(@"Thinhnt show fake call");
    [RNCallKeep reportNewIncomingCall: uuid
                                 handle: @"Stringee"
                             handleType: @"generic"
                               hasVideo: true
                    localizedCallerName: @"Bác sĩ"
                        supportsHolding: YES
                           supportsDTMF: YES
                       supportsGrouping: YES
                     supportsUngrouping: YES
                            fromPushKit: YES
                                payload: nil
                  withCompletionHandler: completion];
    
    [RNCallKeep endCallWithUUID:uuid reason:1];
  }
  completion();
}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  return [CodePush bundleURL];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  return true;
}

// fb login
- (BOOL)application:(UIApplication *)app
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  if ([[FBSDKApplicationDelegate sharedInstance] application:app openURL:url options:options]) {
    return YES;
  }

  if ([RCTLinkingManager application:app openURL:url options:options]) {
    return YES;
  }
  // return [RCTLinkingManager application:application openURL:url options:options];

  return NO;
}

// Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler {
  BOOL result = [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  return [super application:application continueUserActivity:userActivity restorationHandler:restorationHandler] || result;
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  return [super application:application didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  return [super application:application didFailToRegisterForRemoteNotificationsWithError:error];
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}
// Explicitly define remote notification delegates to ensure compatibility with some third-party libraries
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  return [super application:application didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

@end
