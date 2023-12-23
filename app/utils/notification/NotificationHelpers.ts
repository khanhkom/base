import { navigate } from "@app/navigators/navigationUtilities"
import notifee, { AndroidColor, AndroidImportance, AndroidVisibility } from "@notifee/react-native"
import { NotificationChannel } from "./HandleCreateChannel"
import { AppState, Platform } from "react-native"
import RNNotificationCall from "react-native-full-screen-notification-incoming-call"

interface NotificationData {
  collapseKey?: string
  data: {
    actionType: string
    icon: string
    id: string
  }
  from: string
  messageId: string
  notification: {
    android: any
    body: string
    title: string
  }
  sentTime: number
  ttl: number
}
export const registerForegroundService = async () => {
  notifee.registerForegroundService(() => {
    return new Promise(() => {
      // Example task subscriber
    })
  })
}
export const handlePressOpenNotification = (notification: NotificationData) => {
  try {
    const { data } = notification
    const actionType = notification?.data?.actionType
    console.log("handlePressOpenNotification::", notification, actionType)
    switch (actionType) {
      case "open_question":
        navigate("DetailQuestion", { id: data.id })
        break
      case "open_order":
        navigate("DetailBooking", { id: data.id })
        break
      case "open_call":
        if (Platform.OS === "android") {
          RNNotificationCall.backToApp()
        }
        break
      // Add more cases for other action types and corresponding screens
      default:
        if (Platform.OS === "android") {
          RNNotificationCall.backToApp()
        }
        // Handle default case if needed
        break
    }
  } catch (error) {
    console.warn("handlePressOpenNotification::", error)
  }
}
export const handleShowNotification = async (notification: NotificationData) => {
  console.log("handleShowNotification:::", notification)
  const notificationNew = {
    title: notification?.notification?.title,
    body: notification?.notification?.body,
    data: notification?.data,
    android: {
      channelId: NotificationChannel.GENERAL,
    },
  }
  if (AppState.currentState === "active") {
    await notifee.displayNotification(notificationNew)
  }
  // Display the notification
}

export const handleShowNotiInCall = async () => {
  try {
    if (Platform.OS === "ios") return
    await notifee.displayNotification({
      title: "Bác sĩ",
      body: "Nhấn để quay trở lại cuộc gọi",
      data: {
        actionType: "open_call",
      },
      android: {
        channelId: NotificationChannel.INCALL,
        asForegroundService: true,
        color: AndroidColor.GREEN,
        colorized: true,
      },
    })
  } catch (error) {
    console.warn("error::", error)
  }
}
export const stopNotiInCall = async () => {
  await notifee.stopForegroundService()
}
