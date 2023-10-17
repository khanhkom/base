import AUTH_IMAGE from "./images/auth/image"
import HOME_DEFAULTS from "./images/default"
import HOME_IMAGES from "./images/home"
import IMAGE_DATLICH from "./images/datlich"
import IMAGE_CALL from "./images/call"
import IMAGE_TABBAR from "./images/tabbar"
import IMAGE_NOTIFICATIONS from "./images/notification"
import IMAGES_PROFILE from "./images/profile"
import IMAGES_CHAT from "./images/chat"

const IMAGE = {
  ...AUTH_IMAGE,
  ...HOME_IMAGES,
  ...HOME_DEFAULTS,
  ...IMAGE_DATLICH,
  ...IMAGE_CALL,
  ...IMAGE_TABBAR,
  ...IMAGE_NOTIFICATIONS,
  ...IMAGES_PROFILE,
  ...IMAGES_CHAT,
}
export default IMAGE
