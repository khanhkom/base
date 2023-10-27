// mixpanel_utils.js
import { Mixpanel } from "mixpanel-react-native"
const mixpanelToken = "df9c587033fddf7d8089d779b4146fb6"

const trackAutomaticEvents = true
const mixpanel = new Mixpanel(mixpanelToken, trackAutomaticEvents)
mixpanel.init()

// Function to track an event in Mixpanel
export function trackEvent(eventName: string, properties?: any) {
  // Track the event with optional properties
  mixpanel.track(eventName, properties || {})
}

// Function to identify a user in Mixpanel
export function identifyUser(userId: string, properties?: any) {
  // Identify the user with optional properties
  mixpanel.identify(userId)
  if (properties) {
    mixpanel.getPeople().set(properties)
  }
}
