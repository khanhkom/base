import { StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
const LIST_SPECIALIST = ["Nhi khoa", "Răng hàm mặt"]
export default function ItemSpecialList() {
  return (
    <View style={styles.container}>
      <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
        Chuyên khoa:
      </Text>
      <View style={styles.flexRow}>
        {LIST_SPECIALIST.map((item, index) => {
          return (
            <View key={index} style={styles.item}>
              <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
                {item}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: HEIGHT(spacing.md),
    flexDirection: "row",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    borderRadius: 100,
    backgroundColor: colors.gray_1,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.xxs),
    marginLeft: WIDTH(spacing.xs),
  },
})
