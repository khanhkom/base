import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
export default function EmptySearch() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={R.images.empty_chat} />
      <Text size="ba" weight="normal" style={styles.desc}>
        Không tìm thấy kết quả phù hợp
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
    justifyContent: "center",
    alignItems: "center",
    paddingTop: HEIGHT(spacing.xxxl),
  },

  image: {
    width: WIDTH(132),
    height: WIDTH(132),
  },
  desc: {
    color: colors.gray_6,
    marginBottom: HEIGHT(spacing.lg),
    textAlign: "center",
  },
})
