import { navigate } from "@app/navigators/navigationUtilities"
import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native"
import { NotificationChannel } from "./HandleCreateChannel"
import { AppState } from "react-native"

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
export const handlePressOpenNotification = (notification: NotificationData) => {
  const { data } = notification
  const actionType = notification?.data?.actionType
  console.log("handlePressOpenNotification::", actionType)
  switch (actionType) {
    case "open_question":
      navigate("DetailQuestion", { id: data.id })
      break
    case "open_order":
      navigate("DetailBooking", { id: data.id })
      break
    // Add more cases for other action types and corresponding screens
    default:
      // Handle default case if needed
      break
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
