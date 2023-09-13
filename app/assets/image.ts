import AUTH_IMAGE from "./images/auth/image"
import HOME_DEFAULTS from "./images/default"
import HOME_IMAGES from "./images/home"
import IMAGE_DATLICH from "./images/datlich"
import IMAGE_CALL from "./images/call"
import IMAGE_TABBAR from "./images/tabbar"

const IMAGE = {
  ...AUTH_IMAGE,
  ...HOME_IMAGES,
  ...HOME_DEFAULTS,
  ...IMAGE_DATLICH,
  ...IMAGE_CALL,
  ...IMAGE_TABBAR,
}
export default IMAGE
