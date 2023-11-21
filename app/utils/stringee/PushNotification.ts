import KeepAwake from "react-native-keep-awake"
import { AppState, Platform, Vibration } from "react-native"
import RNCallKeep from "react-native-callkeep"
import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native"
import RNNotificationCall from "react-native-full-screen-notification-incoming-call"
import { ActionFromCallKit } from "@app/context/themeContext"
import InCallManager from "react-native-incall-manager"
import * as storage from "@app/utils/storage"
import UUIDGenerator from "react-native-uuid-generator"
import { request, check, PERMISSIONS, RESULTS, requestMultiple } from "react-native-permissions"

export async function displayIncomingCall() {
  const callkitId = await UUIDGenerator.getRandomUUID()
  RNCallKeep.displayIncomingCall(callkitId, "Stringee", "", "number", true)
}

export async function createNotificationChannel() {
  return await notifee.createChannel({
    id: "sdocterpatient_2",
    name: "sdocterpatient_2",
    vibration: true,
    visibility: AndroidVisibility.PUBLIC,
    vibrationPattern: [300, 500],
    importance: AndroidImportance.HIGH,
  })
}

export async function displayNotification(fullname) {
  const pattern = [0, 500, 200, 500]
  // Vibrate with the waveform pattern
  Vibration.vibrate(pattern, true)
  // playSampleSound(soundsList[0])

  RNNotificationCall.displayNotification("22221a97-8eb4-4ac2-b2cf-0a3c0b9100ad", null, 30000, {
    channelId: "sdocterpatient_2",
    channelName: "sdocterpatient_2",
    notificationIcon: "ic_launcher", //mipmap
    notificationTitle: "B.s " + fullname || "",
    notificationBody: "Cuộc gọi video đến",
    answerText: "Nghe",
    declineText: "Từ chối",
    notificationColor: "colorAccent",

    //mainComponent:'MyReactNativeApp',//AppRegistry.registerComponent('MyReactNativeApp', () => CustomIncomingCall);
    // payload:{name:'Test',Body:'test'}
  })
}

export async function onMessageReceived(message) {
  try {
    console.log("notification", message)
    const data = JSON.parse(message.data.data)
    const callStatus = data?.callStatus
    const from = data?.from?.number

    const fullName = data?.from?.alias

    console.log("data: " + callStatus, AppState.currentState)
    const isShowNotification = AppState.currentState !== "active"
    const channelId = await createNotificationChannel()
    // const channelId = "sdocterpatient"

    // console.log("channelId_channelId", channelId)
    KeepAwake.activate()
    const granted = await check(PERMISSIONS.ANDROID.READ_PHONE_NUMBERS)
    await notifee.displayNotification({
      title: "Notification Title",
      body: "Main body content of the notification",
      android: {
        channelId,
      },
    })

    switch (callStatus) {
      case "started":
        console.log("started_started", isShowNotification)
        InCallManager.startRingtone("incallmanager_ringtone.mp3") // or _DEFAULT_ or system filename with extension

        if (granted !== RESULTS.GRANTED) {
          if (isShowNotification) {
            displayNotification(fullName)
          }
        } else {
          await displayIncomingCall()
        }
        if (isShowNotification) {
          if (Platform.OS === "android") {
            RNCallKeep.addEventListener("showIncomingCallUi", ({ callUUID: uuid }) => {
              displayNotification(fullName)
              console.log("showIncomingCallUi_showIncomingCallUi", uuid)
            })
            RNNotificationCall.addEventListener("answer", async (data) => {
              RNNotificationCall.backToApp()
              Vibration.cancel()
              const { callUUID, payload } = data
              await storage.saveString(
                storage.KEYSTORAGE.ACTION_FROM_CALLKIT,
                ActionFromCallKit.ANSWER,
              )
              console.log("press answer", callUUID)
            })
            RNNotificationCall.addEventListener("endCall", async (data) => {
              RNNotificationCall.backToApp()
              Vibration.cancel()
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
        InCallManager.stopRingtone()
        RNCallKeep.endAllCalls()
        Vibration.cancel()
        RNNotificationCall.hideNotification()
        notifee.cancelAllNotifications()
        break
    }
  } catch (error) {
    console.log("NOTI_ERROR::", error)
  }
}
