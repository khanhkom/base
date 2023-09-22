import * as React from "react"
import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={[
          $imageStyle,
          color && { tintColor: color },
          size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../assets/icons/back.png"),
  bell: require("../../assets/icons/bell.png"),
  caretLeft: require("../../assets/icons/caretLeft.png"),
  caretRight: require("../../assets/icons/caretRight.png"),
  check: require("../../assets/icons/check.png"),
  clap: require("../../assets/icons/clap.png"),
  community: require("../../assets/icons/community.png"),
  components: require("../../assets/icons/components.png"),
  debug: require("../../assets/icons/debug.png"),
  github: require("../../assets/icons/github.png"),
  heart: require("../../assets/icons/heart.png"),
  hidden: require("../../assets/icons/hidden.png"),
  ladybug: require("../../assets/icons/ladybug.png"),
  lock: require("../../assets/icons/lock.png"),
  menu: require("../../assets/icons/menu.png"),
  more: require("../../assets/icons/more.png"),
  pin: require("../../assets/icons/pin.png"),
  podcast: require("../../assets/icons/podcast.png"),
  settings: require("../../assets/icons/settings.png"),
  slack: require("../../assets/icons/slack.png"),
  view: require("../../assets/icons/view.png"),
  x: require("../../assets/icons/x.png"),
  arrow_down: require("./icons/arrow-down.png"),
  arrow_left: require("./icons/arrow-left.png"),
  calendar: require("./icons/calendar.png"),
  arrow_right: require("./icons/arrow-right.png"),
  ic_noti: require("./icons/ic_noti.png"),
  arrow_circle_right: require("./icons/arrow-circle-right.png"),
  add_circle: require("./icons/add-circle.png"),
  ic_start: require("./icons/ic_start.png"),
  ic_home: require("./icons/ic_home.png"),
  ic_chat: require("./icons/ic_chat.png"),
  ic_calendar: require("./icons/ic_calendar.png"),
  ic_profile: require("./icons/ic_profile.png"),
  call: require("./icons/call.png"),
  "call-end": require("./icons/call-end.png"),
  "mic-off": require("./icons/mic-off.png"),
  videocam: require("./icons/videocam.png"),
  "videocam-off": require("./icons/videocam-off.png"),
  "volume-off": require("./icons/volume-off.png"),
  "volume-up": require("./icons/volume-up.png"),
  delete: require("./icons/delete.png"),
  filter: require("./icons/filter.png"),
  user_search: require("./icons/user_search.png"),
  department: require("./icons/department.png"),
  briefcase: require("./icons/briefcase.png"),
  award: require("./icons/award.png"),
  navigate_before: require("./icons/navigate_before.png"),
  navigate_next: require("./icons/navigate_next.png"),
  personalcard: require("./icons/personalcard.png"),
  directbox_send: require("./icons/directbox-send.png"),
  note: require("./icons/note.png"),
  ask: require("./icons/ask.png"),
  folder_add: require("./icons/folder-add.png"),
  rotate_left: require("./icons/rotate-left.png"),
  arrow_right_full: require("./icons/arrow-circle-right-full.png"),
  message_filled: require("./icons/message-filled.png"),
  microphone_2: require("./icons/microphone-2.png"),
  ic_call: require("./icons/ic_call.png"),
  ic_chat_filled: require("./icons/message-filled.png"),
  ic_call_video: require("./icons/ic_call_video.png"),
  switch_camera: require("./icons/switch_camera.png"),
  ic_home_active: require("./icons/ic_home_active.png"),
  ic_calendar_active: require("./icons/ic_calendar_active.png"),
  ic_status_booked: require("./icons/ic_status_booked.png"),
  tick_circle: require("./icons/tick-circle.png"),
  refresh: require("./icons/refresh.png"),
  document_text: require("./icons/document-text.png"),
  edit: require("./icons/edit.png"),
  microphone_slash: require("./icons/microphone-slash.png"),
  camera_slash: require("./icons/camera_slash.png"),
}
const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}
