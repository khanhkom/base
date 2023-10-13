import { FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Header, Icon, Text } from "@app/components/index"
import colors from "@app/assets/colors"

import ItemUserRating from "../DocterInformation/Item/ItemRating"
import StarStatistic from "./Item/StarStatistic"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Divider } from "react-native-paper"
import { useHookRatingDetail } from "./useHookRatingDetail"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import { useHookRating } from "./useHookRating"
import ItemEmpty from "@app/components/ItemEmpty"
import { RefreshState } from "@app/components/refresh-list"
export const DATA_STAR = [
  {
    star: 5,
  },
  {
    star: 4,
  },
  {
    star: 3,
  },
  {
    star: 2,
  },
  {
    star: 1,
  },
]
interface ScreenProps {
  route: {
    params: {
      userId: string
      averageRating: number
      countRating: number
    }
  }
}
export default function DocterReviews({ route }: ScreenProps) {
  const { userId, averageRating, countRating } = route?.params
  const [starSelected, setStarSeleted] = useState(0)
  const { refreshState, listData, loading, onHeaderRefresh, onFooterRefresh } = useHookRatingDetail(
    userId,
    starSelected,
  )

  const { listData: listAllData } = useHookRating(userId)
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tất cả đánh giá" backgroundColor={colors.white} />

      <ScrollView>
        <StarStatistic
          averageRating={averageRating}
          countRating={countRating}
          listData={listAllData}
        />
        <View style={styles.flexRow}>
          <Pressable
            onPress={() => {
              setStarSeleted(0)
            }}
            style={starSelected === 0 ? styles.buttonActive : styles.button}
          >
            <Text
              size="ba"
              weight="normal"
              style={{ color: starSelected === 0 ? colors.white : colors.gray_6 }}
            >
              Tất cả
            </Text>
          </Pressable>
          {DATA_STAR.map((item, index) => {
            const isActive = item.star === starSelected
            return (
              <Pressable
                onPress={() => {
                  setStarSeleted(item.star)
                }}
                style={!isActive ? styles.button : styles.buttonActive}
                key={index}
              >
                <Text
                  size="ba"
                  weight="normal"
                  style={{ color: isActive ? colors.white : colors.gray_6, marginRight: WIDTH(4) }}
                >
                  {item.star}
                </Text>
                <Icon
                  icon="ic_start"
                  size={WIDTH(12)}
                  key={index}
                  color={isActive ? colors.yellow_6 : colors.gray_4}
                />
              </Pressable>
            )
          })}
        </View>
        <Divider />
        <FlatList
          data={listData}
          renderItem={({ item, index }) => {
            return (
              <ItemUserRating
                criteria={item?.criteria ?? []}
                description={item?.description}
                createdAt={item?.createdAt}
                score={item?.score}
              />
            )
          }}
          ListFooterComponent={<View style={{ height: HEIGHT(32) }} />}
          ListEmptyComponent={() => {
            return <ItemEmpty title="Không có đánh giá nào!" />
          }}
          onRefresh={onHeaderRefresh}
          onMomentumScrollEnd={onFooterRefresh}
          keyExtractor={(item, index) => String(index)}
          refreshing={refreshState === RefreshState.HeaderRefreshing}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.md),
    marginBottom: HEIGHT(spacing.sm),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(10),
    backgroundColor: colors.gray_0,
    borderRadius: 50,
    paddingVertical: HEIGHT(8),
  },
  buttonActive: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: WIDTH(10),
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: HEIGHT(8),
  },
})
