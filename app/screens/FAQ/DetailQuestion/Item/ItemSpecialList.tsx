import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { ISpecialList } from "@app/interface/docter"
export default function ItemSpecialList({ data }: { data: ISpecialList[] }) {
  if (data?.length > 0)
    return (
      <ScrollView horizontal>
        <View style={styles.container}>
          <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
            Chuyên khoa:
          </Text>
          <View style={styles.flexRow}>
            {data.map((item, index) => {
              return (
                <View key={index} style={styles.item}>
                  <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
                    {item?.name || item?.value}
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      </ScrollView>
    )
  return <View style={{ marginTop: HEIGHT(spacing.md) }} />
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
