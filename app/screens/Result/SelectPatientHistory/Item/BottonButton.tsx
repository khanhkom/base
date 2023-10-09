import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { iconRegistry } from "@app/components/Icon"

export default function BottonButton() {
  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        style={styles.buttonHome}
        textColor={colors.primary}
        icon={iconRegistry.folder_add}
        onPress={() => {
          navigate("CreatePatient")
        }}
      >
        Thêm mới hồ sơ
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: HEIGHT(spacing.sm),
  },
  buttonHome: {
    flex: 1,
    borderRadius: 8,
    borderColor: colors.primary,
    marginHorizontal: WIDTH(spacing.md),
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
})
