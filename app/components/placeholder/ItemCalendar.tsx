import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from "rn-placeholder"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"

export default function ItemPlaceholderCommon() {
  return (
    <Placeholder style={styles.item} Animation={Fade} Left={PlaceholderMedia}>
      <PlaceholderLine width={80} />
      <PlaceholderLine />
      <PlaceholderLine width={30} />
    </Placeholder>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.lg),
    marginTop: HEIGHT(spacing.sm),
    width: WIDTH(343),
    borderRadius: WIDTH(12),
  },
})
