import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native"
export const NotificationChannel = {
  GENERAL: "sdocterpatient_general",
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
