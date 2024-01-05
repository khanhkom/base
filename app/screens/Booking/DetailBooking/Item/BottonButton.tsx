import { StyleSheet, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { HEIGHT, TYPE_TIME_CALL, WIDTH, getTypeTimeInRangeCall } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { IOrderHistory, STATUS_ORDER } from "@app/interface/order"
import { translate } from "@app/i18n/translate"
interface ItemProps {
  id: string
  status: string
  getDetailOrderApi: () => void
  userId: string
  clientId: string
  to: string
  detailOrder: IOrderHistory
  updateDataCreateOrder?: () => void
  reloadHistory?: () => void
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
  reloadHistory,
}: ItemProps) {
  // console.log("AAAAAAA", detailOrder?.doctor)
  const onPressCall = () => {
    // console.log("AAAAAA", clientId?.current?.getId?.())
    navigate("CallScreenHook", {
      callId: "",
      clientId,
      isVideoCall: true,
      from: userId,
      to,
      isIncoming: false,
      detailOrder,
    })
  }
  const typeTimeCall = getTypeTimeInRangeCall(
    detailOrder?.timeRange?.from,
    detailOrder?.timeRange?.to,
  )

  if (status === STATUS_ORDER.created) {
    if (typeTimeCall === TYPE_TIME_CALL.CHUA_DEN) {
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
            {translate("booking.button.cancel")}
          </Button>
          <Button
            onPress={() => {
              updateDataCreateOrder()
              navigate("CompleteBooking", { id, type: "update" })
            }}
            mode="contained"
            style={styles.button}
          >
            {translate("booking.button.swap_order")}
          </Button>
        </View>
      )
    } else return <View />
  }

  if (status === STATUS_ORDER.verified || status === STATUS_ORDER.examining)
    if (typeTimeCall !== TYPE_TIME_CALL.DA_DEN)
      //origin ===
      return (
        <View style={styles.container}>
          <Button
            mode="contained"
            style={styles.buttonHome}
            textColor={colors.primary}
            onPress={() => {
              navigate("DetailConversation", {
                targetUser: detailOrder?.doctor,
              })
            }}
          >
            {translate("booking.button.message")}
          </Button>
          <Button onPress={onPressCall} mode="contained" style={styles.button}>
            {translate("booking.button.enter_call")}
          </Button>
        </View>
      )
    else {
      return <View />
      // return (
      //   <View style={styles.container}>
      //     <Button mode="contained" style={styles.button}>
      //       {typeTimeCall === TYPE_TIME_CALL.CHUA_DEN
      //         ? translate("booking.button.not_in_time_exam")
      //         : translate("booking.button.over_time_exam")}
      //     </Button>
      //   </View>
      // )
    }
  if (status === STATUS_ORDER.result_processing)
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigate("DetailExamination", { id, specialist: detailOrder?.specialist })
          }}
          mode="contained"
          style={styles.button}
        >
          {translate("booking.button.send_rating")}
        </Button>
      </View>
    )
  if (status === STATUS_ORDER.rating_processing)
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigate("RatingDocter", {
              id,
              doctor: detailOrder?.doctor,
              reloadData: () => {
                getDetailOrderApi()
                reloadHistory()
              },
            })
          }}
          mode="contained"
          style={styles.buttonHome}
          textColor={colors.primary}
        >
          {translate("booking.button.send_rating")}
        </Button>
        <Button
          onPress={() => {
            navigate("DetailExamination", { id, specialist: detailOrder?.specialist })
          }}
          mode="contained"
          style={styles.button}
        >
          {translate("booking.button.view_result")}
        </Button>
      </View>
    )
  if (status === STATUS_ORDER.done)
    return (
      <View style={styles.container}>
        <Button
          onPress={() => {
            navigate("DetailExamination", { id, specialist: detailOrder?.specialist })
          }}
          mode="contained"
          style={styles.button}
        >
          {translate("booking.button.view_result")}
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
