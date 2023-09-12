import { FlatList, Pressable, ScrollView, StyleSheet, View } from "react-native"
import React from "react"
import { Header, Icon, Text } from "@app/components/index"
import colors from "@app/assets/colors"

import ItemUserRating from "../DocterInformation/Item/ItemRating"
import StarStatistic from "./Item/StarStatistic"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Divider } from "react-native-paper"
export const DATA_STAR = [
  {
    star: 5,
    total: 120,
  },
  {
    star: 4,
    total: 60,
  },
  {
    star: 3,
    total: 30,
  },
  {
    star: 2,
    total: 30,
  },
  {
    star: 1,
    total: 0,
  },
]
export default function DocterReviews() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tất cả đánh giá" backgroundColor={colors.white} />

      <ScrollView>
        <StarStatistic />
        <View style={styles.flexRow}>
          <Pressable style={styles.button}>
            <Text size="ba" weight="normal" style={{ color: colors.gray_6 }}>
              Tất cả
            </Text>
          </Pressable>
          {DATA_STAR.map((item, index) => {
            const isActive = index === 0
            return (
              <Pressable style={!isActive ? styles.button : styles.buttonActive} key={index}>
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
          data={[1, 2, 3, 4]}
          renderItem={() => {
            return <ItemUserRating />
          }}
          ListFooterComponent={<View style={{ height: HEIGHT(32) }} />}
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
