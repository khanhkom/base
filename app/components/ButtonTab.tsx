import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import colors from "@app/assets/colors"
import { WIDTH } from "@app/config/functions"
import { spacing } from "../theme"
interface ItemProps {
  text: string
  isActive: boolean
  onPress: () => void
}
export default function ButtonTab({ text, isActive, onPress }: ItemProps) {
  return (
    <View style={[isActive && styles.activeTab, styles.container]}>
      <Button
        onPress={onPress}
        labelStyle={{ color: isActive ? colors.primary : colors.gray_5, marginHorizontal: 0 }}
      >
        {text}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginRight: WIDTH(spacing.lg),
  },
  activeTab: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
})
