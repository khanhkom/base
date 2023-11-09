import KeepAwake from "react-native-keep-awake"
import { AppState, Platform, Vibration } from "react-native"
import RNCallKeep from "react-native-callkeep"
import notifee, { AndroidVisibility } from "@notifee/react-native"
import RNNotificationCall from "react-native-full-screen-notification-incoming-call"
import { getNameById } from "@app/services/api/functions/stringee"
import { ActionFromCallKit } from "@app/context/themeContext"
import InCallManager from "react-native-incall-manager"
import * as storage from "@app/utils/storage"

export async function displayIncomingCall(notificationId, dataName, channelId) {
  RNCallKeep.displayIncomingCall(notificationId, dataName, channelId, "number", false)
}

export async function createNotificationChannel() {
  return await notifee.createChannel({
    id: "sdocter",
    name: "sdocter",
    vibration: true,
    sound: "messenger_ringtone",
    visibility: AndroidVisibility.PUBLIC,
    vibrationPattern: [300, 500],
  })
}

export async function displayNotification(dataName) {
  const pattern = [0, 500, 200, 500]
  // Vibrate with the waveform pattern
  Vibration.vibrate(pattern, true)
  RNNotificationCall.displayNotification("22221a97-8eb4-4ac2-b2cf-0a3c0b9100ad", null, 30000, {
    channelId: "sdocter",
    channelName: "sdocter",
    notificationIcon: "ic_launcher", //mipmap
    notificationTitle: "Bác sĩ " + dataName?.fullname ?? "",
    notificationBody: "Cuộc gọi video đến",
    answerText: "Nghe",
    declineText: "Từ chối",
    notificationColor: "colorAccent",

    //mainComponent:'MyReactNativeApp',//AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
    // payload:{name:'Test',Body:'test'}
  })
}

export async function onMessageReceived(message) {
  console.log("notification", message)
  const data = JSON.parse(message.data.data)
  const callStatus = data?.callStatus
  const from = data?.from?.number
  const dataName = await getNameById(from)
  const notificationId = "11111" // YOUR_NOTIFICATION_ID
  console.log("data: " + callStatus, AppState.currentState)
  const isShowNotification = AppState.currentState !== "active"
  const channelId = await createNotificationChannel()
  KeepAwake.activate()
  switch (callStatus) {
    case "started":
      console.log("started_started", isShowNotification)
      await displayIncomingCall(notificationId, dataName?.fullname ?? from, channelId)
      RNCallKeep.addEventListener("showIncomingCallUi", async ({ callUUID }) => {
        console.log("didDisplayIncomingCall:::callUUID", callUUID)
        await storage.saveString(storage.KEYSTORAGE.CALLKIT_ID, callUUID)
      })
      if (isShowNotification) {
        if (Platform.OS === "android") {
          RNCallKeep.addEventListener("showIncomingCallUi", ({ callUUID: uuid }) => {
            console.log("showIncomingCallUi_showIncomingCallUi", uuid)
            displayNotification(dataName)
          })
          RNNotificationCall.addEventListener("answer", async (data) => {
            RNNotificationCall.backToApp()
            const { callUUID, payload } = data
            await storage.saveString(
              storage.KEYSTORAGE.ACTION_FROM_CALLKIT,
              ActionFromCallKit.ANSWER,
            )
            console.log("press answer", callUUID)
          })
          RNNotificationCall.addEventListener("endCall", async (data) => {
            RNNotificationCall.backToApp()
            const { callUUID, endAction, payload } = data
            InCallManager.stopRingtone()
            await storage.saveString(
              storage.KEYSTORAGE.ACTION_FROM_CALLKIT,
              ActionFromCallKit.REJECT,
            )
            console.log("press endCall", callUUID)
          })
        }
      }

      break
    case "ended":
      RNCallKeep.endAllCalls()
      Vibration.cancel()
      RNNotificationCall.hideNotification()
      notifee.cancelAllNotifications()
      break
  }
}
