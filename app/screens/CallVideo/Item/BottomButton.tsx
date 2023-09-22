import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
interface ItemProps {
  onCancel: () => void
  onAccept: () => void
}
export default function BottomButton({ onCancel, onAccept }: ItemProps) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        style={styles.buttonHome}
        textColor={colors.white}
        onPress={onCancel}
      >
        Từ chối
      </Button>
      <Button onPress={onAccept} mode="contained" style={styles.button} textColor={colors.primary}>
        Nghe
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    left: 0,
    right: 0,
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: HEIGHT(spacing.xl),
  },
  buttonHome: {
    flex: 1,
    marginRight: WIDTH(spacing.md),
    borderRadius: 8,
    backgroundColor: colors.red_5,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
})
