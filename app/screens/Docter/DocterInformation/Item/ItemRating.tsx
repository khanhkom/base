import { StyleSheet, View } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Avatar, Card, List } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import R from "@app/assets"
export const ItemTotalStar = ({ star }: { star: number }) => {
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
        paddingBottom: HEIGHT(spacing.sm),
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
        <Text size="sm" weight="medium" style={{ marginLeft: WIDTH(spacing.xxs) }}>
          Chuyên môn tốt, Tư vấn tận tình
        </Text>
      </View>
      <Text size="ba" weight="normal" style={{ marginTop: HEIGHT(spacing.xs) }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Text>
    </Card>
  )
}
export default ItemUserRating
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowStar: {
    flexDirection: "row",
    alignItems: "center",
  },
})
