import { Pressable, StyleSheet, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import { navigate } from "@app/navigators/navigationUtilities"
export default function ItemFrequently() {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigate("FrequentlyFAQ")
      }}
    >
      <Image source={R.images.frequently_faq} style={styles.icon} />
      <Text size="ba" weight="medium" style={{ color: colors.white }}>
        Một số câu hỏi thường gặp
      </Text>
      <Icon icon="arrow_right" size={WIDTH(16)} color={colors.white} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WIDTH(263),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.xs),
    backgroundColor: colors.orange_6,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: HEIGHT(spacing.sm),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
    marginRight: WIDTH(spacing.xs),
  },
})
