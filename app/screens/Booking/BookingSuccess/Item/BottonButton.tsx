import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"

export default function BottonButton() {
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
        Về trang chủ
      </Button>
      <Button
        onPress={() => {
          navigate("SelectPatientRecord")
        }}
        mode="contained"
        style={styles.button}
      >
        Đặt lịch khác
      </Button>
    </View>
  )
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
