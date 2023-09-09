import Toast from "react-native-toast-message"
export enum EToastType {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
}
export const showToastMessage = (
  message: string,
  type = "success",
  position?: "bottom" | "top",
  value = 1,
) => {
  Toast.show({
    type: type,
    position: position || "top",
    [`text${value}`]: message,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 40,
    onShow: () => {},
    onHide: () => {}, // called when Toast hides (if `autoHide` was set to `true`)
    onPress: () => {},
    props: {}, // any custom props passed to the Toast component
  })
  //   setTimeout(function () {
  //     Toast.hide(toast);
  //   }, 1000);
}
