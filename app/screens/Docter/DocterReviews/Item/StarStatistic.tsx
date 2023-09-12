import { StyleSheet, View } from "react-native"
import React from "react"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { ItemTotalStar } from "../../DocterInformation/Item/ItemRating"
import { DATA_STAR } from ".."
const totalStar = 210

const ItemEachStar = ({ item }) => {
  const widthActive = (item?.total / totalStar) * WIDTH(80)
  return (
    <View style={styles.itemEachStar}>
      <ItemTotalStar star={item.star} />
      <View style={styles.progress}>
        <View style={[styles.progressActive, { width: widthActive }]}></View>
      </View>
      <Text size="sm" weight="normal" style={{ color: colors.gray_5 }}>
        {item.total}
      </Text>
    </View>
  )
}
export default function StarStatistic() {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>
        <View style={styles.headRating}>
          <Icon icon="ic_start" size={WIDTH(24)} />
          <Text
            size="xxxl"
            weight="semiBold"
            style={{ color: colors.gray_9, marginHorizontal: WIDTH(6) }}
          >
            4.7
          </Text>
        </View>
        <Text
          size="ba"
          weight="normal"
          style={{ color: colors.gray_6, textAlignVertical: "center" }}
        >
          120 đánh giá
        </Text>
      </View>
      <View
        style={{
          borderLeftWidth: 1,
          borderLeftColor: colors.gray_2,
        }}
      >
        {DATA_STAR.map((item, index) => {
          return <ItemEachStar item={item} key={index} />
        })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  headRating: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(4),
  },
  container: {
    marginHorizontal: WIDTH(spacing.md),
    flexDirection: "row",
    alignItems: "center",
  },
  leftView: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: WIDTH(spacing.md),
  },
  itemEachStar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(4),
  },
  progress: {
    width: WIDTH(80),
    height: HEIGHT(4),
    borderRadius: 100,
    backgroundColor: colors.gray_2,
    marginHorizontal: WIDTH(spacing.sm),
  },
  progressActive: {
    width: WIDTH(10),
    height: HEIGHT(4),
    borderRadius: 100,
    backgroundColor: colors.gray_5,
  },
})
