import { StyleSheet, View } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Avatar, Card, List } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import R from "@app/assets"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemUserRating from "./ItemRating"

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
            <Text
              size="ba"
              weight="normal"
              style={{ color: colors.blue_6 }}
              onPress={() => {
                navigate("DocterReviews")
              }}
            >
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
    paddingBottom: 100,
  },
  headRating: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(4),
  },
})
