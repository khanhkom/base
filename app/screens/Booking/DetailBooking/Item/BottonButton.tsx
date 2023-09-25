import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { IOrderHistory, STATUS_ORDER } from "@app/interface/order"
interface ItemProps {
  id: string
  status: string
  getDetailOrderApi: () => void
  userId: string
  clientId: string
  to: string
  detailOrder: IOrderHistory
  updateDataCreateOrder?: () => void
}
export default function BottonButton({
  status,
  id,
  getDetailOrderApi,
  userId,
  clientId,
  to,
  detailOrder,
  updateDataCreateOrder,
}: ItemProps) {
  const onPressCall = () => {
    // console.log("AAAAAA", clientId?.current?.getId?.())
    navigate("Call2Screen", {
      callId: "",
      clientId: clientId,
      isVideoCall: true,
      from: userId,
      to: to,
      isIncoming: false,
      detailOrder: detailOrder,
    })
  }
  if (status === STATUS_ORDER.created)
    return (
      <View style={styles.container}>
        <Button
          mode="contained"
          style={[styles.buttonHome, { backgroundColor: colors.red_0 }]}
          textColor={colors.red_5}
          onPress={() => {
            navigate("CancelBooking", { id, getDetailOrderApi })
          }}
        >
          Hủy
        </Button>
        <Button
          onPress={() => {
            updateDataCreateOrder()
            navigate("CompleteBooking", { id })
          }}
          mode="contained"
          style={styles.button}
        >
          Đổi lịch khám
        </Button>
      </View>
    )
  if (status === STATUS_ORDER.verified)
    return (
      <View style={styles.container}>
        <Button
          mode="contained"
          style={styles.buttonHome}
          textColor={colors.primary}
          onPress={() => {
            navigate("Home")
          }}
        >
          Nhắn tin
        </Button>
        <Button onPress={onPressCall} mode="contained" style={styles.button}>
          Vào cuộc gọi
        </Button>
      </View>
    )
  if (status === STATUS_ORDER.done)
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigate("CallVideo")
          }}
          mode="contained"
          style={styles.button}
        >
          Xem kết quả khám
        </Button>
      </View>
    )
  else return null
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
    flexDirection: "row",
    left: 0,
    right: 0,
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: HEIGHT(spacing.sm),
  },
  buttonHome: {
    flex: 1,
    marginRight: WIDTH(spacing.md),
    borderRadius: 8,
    backgroundColor: colors.primary_0,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
})
