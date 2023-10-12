import { FlatList, StyleSheet, View } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { List } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemUserRating from "./ItemRating"
import { translate } from "@app/i18n/translate"
import { useHookRatingDetail } from "../../DocterReviews/useHookRatingDetail"
interface ItemProps {
  averageRating: number
  countRating: number
  userId: string
}
export default function Rating({ countRating, averageRating, userId }: ItemProps) {
  const { refreshState, listData, loading, onHeaderRefresh, onFooterRefresh } =
    useHookRatingDetail(userId)
  console.log("listData_listData", listData)
  return (
    <View style={styles.container}>
      <List.Item
        title={() => {
          return (
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              {translate("rating.patient_rating")}
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
                navigate("DocterReviews", {
                  userId,
                })
              }}
            >
              {translate("common.view_all")}
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
          {averageRating}
        </Text>
        <Text size="ba" weight="normal" style={styles.textRating}>
          ({countRating} {translate("rating.rating")})
        </Text>
      </View>
      <FlatList
        data={listData}
        renderItem={({ item, index }) => {
          return (
            <ItemUserRating
              criteria={item?.criteria ?? []}
              description={item?.description}
              createdAt={item?.createdAt}
            />
          )
        }}
      />
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
    alignItems: "center",
    flexDirection: "row",
    marginBottom: HEIGHT(4),
    paddingHorizontal: WIDTH(spacing.md),
  },
  textRating: { color: colors.gray_7, textAlignVertical: "center" },
})
