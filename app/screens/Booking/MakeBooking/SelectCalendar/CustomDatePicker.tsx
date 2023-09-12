import * as React from "react"
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  Platform,
  StatusBar,
} from "react-native"
import { useTheme } from "react-native-paper"
import {
  DatePickerModalContent,
  DatePickerModalContentMultiProps,
  DatePickerModalContentRangeProps,
  DatePickerModalContentSingleProps,
} from "react-native-paper-dates"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface DatePickerModalProps {
  visible: boolean
  animationType?: "slide" | "fade" | "none"
  disableStatusBar?: boolean
  disableStatusBarPadding?: boolean
  inputEnabled?: boolean
  presentationStyle?: "fullScreen" | "pageSheet" | "formSheet" | "overFullScreen"
}

export interface DatePickerModalSingleProps
  extends DatePickerModalContentSingleProps,
    DatePickerModalProps {}

export interface DatePickerModalMultiProps
  extends DatePickerModalContentMultiProps,
    DatePickerModalProps {}

export interface DatePickerModalRangeProps
  extends DatePickerModalContentRangeProps,
    DatePickerModalProps {}

export function CustomDatePicker(
  props: DatePickerModalRangeProps | DatePickerModalSingleProps | DatePickerModalMultiProps,
) {
  const theme = useTheme()
  const dimensions = useWindowDimensions()
  const {
    visible,
    animationType,
    disableStatusBar,
    disableStatusBarPadding,
    inputEnabled,
    presentationStyle,
    ...rest
  } = props

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
        <DatePickerModalContent
          {...rest}
          inputEnabled={inputEnabled}
          disableSafeTop={disableStatusBar}
          mode="single"
          locale="vi"
          saveLabelDisabled
        />
      </View>
    </View>
  )
}

const supportedOrientations: any = [
  "portrait",
  "portrait-upside-down",
  "landscape",
  "landscape-left",
  "landscape-right",
]

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalBackground: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    width: "100%",
  },
  modalContentBig: {
    maxWidth: 600,
    maxHeight: 800,
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
})

export default React.memo(CustomDatePicker)
