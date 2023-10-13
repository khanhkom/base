import { StyleSheet, View } from "react-native"
import React from "react"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { ItemTotalStar } from "../../DocterInformation/Item/ItemRating"
import { translate } from "@app/i18n/translate"
import { IRatingDoctorDetail } from "@app/interface/rating"
import { DATA_STAR } from ".."

const ItemEachStar = ({ star, total, totalStar }) => {
  const widthActive = (total / totalStar) * WIDTH(80)
  return (
    <View style={styles.itemEachStar}>
      <ItemTotalStar star={star} />
      <View style={styles.progress}>
        <View style={[styles.progressActive, { width: widthActive }]}></View>
      </View>
      <Text size="sm" weight="normal" style={{ color: colors.gray_5 }}>
        {total}
      </Text>
    </View>
  )
}
interface ItemProps {
  averageRating: number
  countRating: number
  listData: IRatingDoctorDetail[]
}
export default function StarStatistic({ averageRating, countRating, listData }: ItemProps) {
  const totalStar = listData?.length
  const result = listData.reduce((stats, item) => {
    const score = item.score
    if (!stats[score]) {
      stats[score] = { score, total: 0 }
    }
    stats[score].total++
    return stats
  }, {})

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
            {averageRating}
          </Text>
        </View>
        <Text size="ba" weight="normal" style={styles.countRating}>
          {countRating} {translate("rating.rating")}
        </Text>
      </View>
      <View style={styles.rightView}>
        {DATA_STAR.map((item, index) => {
          return (
            <ItemEachStar
              total={result?.[item?.star.toString()]?.total ?? 0}
              star={item?.star}
              key={index}
              totalStar={totalStar || 1}
            />
          )
        })}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: WIDTH(spacing.md),
  },
  countRating: { color: colors.gray_6, textAlignVertical: "center" },
  headRating: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: HEIGHT(4),
    paddingHorizontal: WIDTH(spacing.md),
  },
  itemEachStar: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: HEIGHT(4),
    paddingHorizontal: WIDTH(spacing.md),
  },
  leftView: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: WIDTH(spacing.md),
  },
  progress: {
    backgroundColor: colors.gray_2,
    borderRadius: 100,
    height: HEIGHT(4),
    marginHorizontal: WIDTH(spacing.sm),
    width: WIDTH(80),
  },
  progressActive: {
    backgroundColor: colors.gray_5,
    borderRadius: 100,
    height: HEIGHT(4),
    width: WIDTH(10),
  },
  rightView: {
    borderLeftColor: colors.gray_2,
    borderLeftWidth: 1,
  },
})
