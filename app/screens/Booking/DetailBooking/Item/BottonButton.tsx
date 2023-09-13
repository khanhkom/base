import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
const TYPE_SCHEDULE = {
  BOOKED: 0,
  READY: 1,
  COMPLETE: 2,
  CANCEL: 3,
}

export default function BottonButton({ status }) {
  if (status === TYPE_SCHEDULE.BOOKED)
    return (
      <View style={styles.container}>
        <Button
          mode="contained"
          style={[styles.buttonHome, { backgroundColor: colors.red_0 }]}
          textColor={colors.red_5}
          onPress={() => {
            navigate("CancelBooking")
          }}
        >
          Hủy
        </Button>
        <Button
          onPress={() => {
            navigate("CreateMedicalRecord")
          }}
          mode="contained"
          style={styles.button}
        >
          Đổi lịch khám
        </Button>
      </View>
    )
  if (status === TYPE_SCHEDULE.READY)
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
        <Button
          onPress={() => {
            navigate("CallVideo")
          }}
          mode="contained"
          style={styles.button}
        >
          Vào cuộc gọi
        </Button>
      </View>
    )
  if (status === TYPE_SCHEDULE.COMPLETE)
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
