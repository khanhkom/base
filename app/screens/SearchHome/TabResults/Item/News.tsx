import { FlatList, Image, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import EmptySearch from "./EmptySearch"
const DATA_FAKE = []
export default function News() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA_FAKE}
        ListEmptyComponent={() => {
          return <EmptySearch />
        }}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={styles.item}
              left={() => {
                return (
                  <Image
                    source={{
                      uri: "https://thedailydishrestaurant.com/wp-content/uploads/2023/01/Daily-Dish-5-1030x1023.jpg",
                    }}
                    style={styles.image}
                  />
                )
              }}
              title={() => {
                return (
                  <View>
                    <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                      Các triệu chứng của sốt xuất huyết thường xảy ra ở trẻ sơ sinh
                    </Text>
                    <Text size="xs" weight="normal" style={styles.textTime}>
                      Ăn quả bơ, chuối, các loại hạt giàu protein,
                    </Text>
                  </View>
                )
              }}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  image: {
    width: WIDTH(48),
    height: WIDTH(48),
    alignSelf: "center",
    marginLeft: WIDTH(spacing.sm),
    borderRadius: 8,
  },
  textTime: { color: colors.gray_6, marginTop: HEIGHT(spacing.xxs) },
})
