import { Dimensions, StyleSheet, Image, View } from "react-native"
import React, { useState } from "react"
import Carousel from "react-native-reanimated-carousel"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { Icon } from "@app/components/Icon"
import { List } from "react-native-paper"
const Item = () => {
  return (
    <List.Item
      style={styles.item}
      left={() => {
        return (
          <View style={styles.wrapperImage}>
            <Image source={R.images.package_1} />
          </View>
        )
      }}
      title={() => {
        return (
          <View>
            <Text weight="medium" size="ba" style={{ color: colors.gray_9 }}>
              Gói chẩn đoán sâu
            </Text>
            <Text weight="normal" size="sm" style={{ color: colors.gray_6 }}>
              B.v Thu Cúc
            </Text>
            <Text
              weight="semiBold"
              size="md"
              style={{ color: colors.main_7, marginTop: HEIGHT(6) }}
            >
              B.v Thu Cúc
            </Text>
          </View>
        )
      }}
      right={() => {
        return (
          <View style={{ alignSelf: "center" }}>
            <Icon icon="add_circle" size={WIDTH(28)} />
          </View>
        )
      }}
    />
  )
}
export default function TopPackage() {
  const width = Dimensions.get("window").width
  const [index, setIndex] = useState(0)
  return (
    <View style={styles.container}>
      <View style={styles.itemHead}>
        <Text weight="semiBold" size="xl">
          Gói dịch vụ nổi bật
        </Text>
        <Icon icon="arrow_circle_right" size={WIDTH(24)} />
      </View>
      <Carousel
        loop
        width={width}
        height={WIDTH(230)}
        data={[...new Array(3).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(id) => setIndex(id)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Item />
            <View style={{ height: HEIGHT(12) }} />
            <Item />
          </View>
        )}
      />
      <View style={styles.flexRow}>
        {[...new Array(3).keys()].map((item, id) => {
          return <View key={id} style={id === index ? styles.activeDot : styles.dot} />
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: WIDTH(343),
    height: WIDTH(120),
  },
  container: {
    marginTop: HEIGHT(spacing.lg),
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  itemHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(12),
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: colors.primary_2,
    marginHorizontal: WIDTH(3),
  },
  item: {
    backgroundColor: colors.white,
    width: WIDTH(343),
    paddingLeft: WIDTH(spacing.sm),
    borderRadius: 12,
  },
  activeDot: {
    height: 5,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.main_7,
    marginHorizontal: WIDTH(3),
  },
  wrapperImage: {
    width: WIDTH(72),
    height: WIDTH(72),
    borderRadius: 8,
    backgroundColor: colors.primary_2,
  },
})
