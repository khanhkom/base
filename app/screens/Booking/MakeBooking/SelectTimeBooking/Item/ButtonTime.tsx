import { StyleSheet } from "react-native"
import React from "react"
import { STATUS_DOCTER } from "../Data"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
interface ItemProps {
  title: string
  status: STATUS_DOCTER
  onPress: () => void
  selected: boolean
  isFull: boolean
}
export default function ButtonTime({ title, status, onPress, selected, isFull }: ItemProps) {
  return (
    <Button
      onPress={() => {
        if (!isFull) {
          onPress()
        }
      }}
      mode={status === STATUS_DOCTER.AVAILABLE && !selected ? "outlined" : "contained"}
      style={[
        styles.button,
        selected && { backgroundColor: colors.primary },
        isFull && { backgroundColor: colors.gray_5 },
      ]}
      disabled={isFull}
    >
      {title}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderColor: colors.gray_3,
    borderRadius: 8,
    marginRight: WIDTH(spacing.sm),
    marginTop: HEIGHT(spacing.sm),
  },
})
