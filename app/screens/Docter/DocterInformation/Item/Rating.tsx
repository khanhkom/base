import { StyleSheet, View } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Avatar, Card, List } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import R from "@app/assets"
const ItemTotalStar = ({ star }: { star: number }) => {
  return (
    <View style={styles.flexRowStar}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <Icon
            icon="ic_start"
            size={WIDTH(12)}
            key={index}
            color={index < star ? colors.yellow_6 : colors.gray_4}
          />
        )
      })}
    </View>
  )
}
const ItemUserRating = () => {
  return (
    <Card
      style={{
        marginHorizontal: WIDTH(spacing.md),
        paddingHorizontal: WIDTH(spacing.sm),
        backgroundColor: colors.gray_0,
        marginTop: HEIGHT(spacing.sm),
      }}
      mode="contained"
    >
      <List.Item
        left={() => {
          return <Avatar.Image source={R.images.avatar_docter} size={WIDTH(48)} />
        }}
        title={() => {
          return (
            <View>
              <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                Thanh Bùi 😍
              </Text>
              <Text size="sm" weight="normal" style={{ color: colors.gray_6 }}>
                1 tuần trước
              </Text>
            </View>
          )
        }}
      />
      <View style={styles.flexRow}>
        <ItemTotalStar star={4} />
        <Text size="sm" weight="medium">
          Chuyên môn tốt, Tư vấn tận tình
        </Text>
      </View>
      <Text size="ba" weight="normal" style={{ marginTop: HEIGHT(spacing.xs) }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
    </Card>
  )
}

export default function Rating() {
  return (
    <View style={styles.container}>
      <List.Item
        title={() => {
          return (
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              Bệnh nhân đánh giá:
            </Text>
          )
        }}
        right={() => {
          return (
            <Text size="ba" weight="normal" style={{ color: colors.blue_6 }}>
              Xem tất cả
            </Text>
          )
        }}
      />
      <View style={styles.headRating}>
        <Icon icon="ic_start" size={WIDTH(24)} />
        <Text
          size="xxxl"
          weight="semiBold"
          style={{ color: colors.gray_9, marginHorizontal: WIDTH(6) }}
        >
          4.7
        </Text>
        <Text
          size="ba"
          weight="normal"
          style={{ color: colors.gray_7, textAlignVertical: "center" }}
        >
          (120 đánh giá)
        </Text>
      </View>
      <ItemUserRating />
      <ItemUserRating />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: HEIGHT(spacing.sm),
    paddingBottom: 32,
  },
  headRating: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(4),
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowStar: {
    flexDirection: "row",
    alignItems: "center",
  },
})
