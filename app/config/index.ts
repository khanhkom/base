/**
 * This file imports configuration objects from either the config.dev.js file
 * or the config.prod.js file depending on whether we are in __DEV__ or not.
 *
 * Note that we do not gitignore these files. Unlike on web servers, just because
 * these are not checked into your repo doesn't mean that they are secure.
 * In fact, you're shipping a JavaScript bundle with every
 * config variable in plain text. Anyone who downloads your app can easily
 * extract them.
 *
 * If you doubt this, just bundle your app, and then go look at the bundle and
 * search it for one of your config variable values. You'll find it there.
 *
 * Read more here: https://reactnative.dev/docs/security#storing-sensitive-info
 */
import BaseConfig from "./config.base"
import ProdConfig from "./config.prod"
import DevConfig from "./config.dev"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

GoogleSignin.configure({
  // scopes: ["https://www.googleapis.com/auth/fitness.activity.read"],
  webClientId: "717467473090-4imm3uqsc7rdtg7qgrfs5bnhr3svf1d3.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  forceCodeForRefreshToken: true,
  // loginHint: "", // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: 'Eatsy', // [Android] specifies an account name on the device that should be used
  iosClientId: "717467473090-o7am9q1r2v01kclj0rk4vnmcl98m4tc7.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
})
let ExtraConfig = ProdConfig

if (__DEV__) {
  ExtraConfig = DevConfig
}

const Config = { ...BaseConfig, ...ExtraConfig }

export default Config
