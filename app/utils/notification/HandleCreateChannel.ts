import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native"
export const NotificationChannel = {
  GENERAL: "sdocterpatient_general",
  CALL: "sdocterpatient_2",
  INCALL: "sdocterpatient_incall",
}
export async function createNotificationChannelUtils(name: string) {
  return await notifee.createChannel({
    id: name,
    name: name,
    vibration: true,
    visibility: AndroidVisibility.PUBLIC,
    vibrationPattern: [300, 500],
    importance: AndroidImportance.HIGH,
  })
}
export async function createNotificationChannelDefault() {
  await notifee.createChannel({
    id: NotificationChannel.CALL,
    name: NotificationChannel.CALL,
    vibration: true,
    visibility: AndroidVisibility.PUBLIC,
    vibrationPattern: [300, 500],
    importance: AndroidImportance.HIGH,
  })
  return await notifee.createChannel({
    id: NotificationChannel.INCALL,
    name: NotificationChannel.INCALL,
    importance: AndroidImportance.DEFAULT,
  })
}
