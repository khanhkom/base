import { StyleSheet, Image, View, FlatList } from "react-native"
import React from "react"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Text } from "@app/components/Text"
import { Card } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
const DATA_FEATURES = [
  {
    id: 0,
    title: "Đặt khám tại phòng khám",
    image: R.images.ic_khamlai,
  },
  {
    id: 1,
    title: " Tư vấn trực tuyến ",
    image: R.images.ic_tuvan,
  },
  {
    id: 2,
    title: "Hỏi đáp cộng đồng",
    image: R.images.ic_hoidap,
  },
  {
    id: 3,
    title: "Kết quả khám bệnh",
    image: R.images.ic_ketqua,
  },
  {
    id: 4,
    title: "Nhà thuốc",
    image: R.images.ic_nhathuoc,
  },
  {
    id: 5,
    title: "Kiến thức sơ cấp cứu",
    image: R.images.ic_kienthuc,
  },
]
const Item = ({ item, index }) => {
  return (
    <View style={styles.item}>
      <Image source={item.image} style={styles.icFeature} />
      <Text weight="normal" size="sm" style={{ width: WIDTH(96), textAlign: "center" }}>
        {item.title}
      </Text>
    </View>
  )
}
export default function ItemUtilities() {
  return (
    <Card style={styles.card}>
      <FlatList
        data={DATA_FEATURES}
        numColumns={3}
        renderItem={({ item, index }) => {
          return <Item item={item} index={index} />
        }}
        ItemSeparatorComponent={() => <View style={{ height: HEIGHT(spacing.md) }} />}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  icFeature: {
    height: WIDTH(36),
    width: WIDTH(36),
    marginBottom: HEIGHT(6),
  },
  card: {
    marginHorizontal: WIDTH(spacing.md),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.white,
    marginTop: -HEIGHT(85),
  },
  item: {
    // width: WIDTH(96),
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
