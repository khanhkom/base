import { StyleSheet, Image, View, FlatList, Pressable } from "react-native"
import React from "react"
import R from "@app/assets"
import { HEIGHT, WIDTH, convertDuration } from "@app/config/functions"
import { Text } from "@app/components/Text"
import { Card, List } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { Icon } from "@app/components/Icon"
import useHookHome from "../useHookHome"
const TYPE_FEATURES = {
  DATLICH: 0,
  TUVAN: 1,
  HOIDAP: 2,
  KETQUA: 3,
  NHATHUOC: 4,
  KIENTHUC: 5,
}
const DATA_FEATURES = [
  {
    id: TYPE_FEATURES.DATLICH,
    title: "Đặt khám tại phòng khám",
    image: R.images.ic_khamlai,
  },
  {
    id: TYPE_FEATURES.TUVAN,
    title: " Tư vấn trực tuyến ",
    image: R.images.ic_tuvan,
  },
  {
    id: TYPE_FEATURES.HOIDAP,
    title: "Hỏi đáp cộng đồng",
    image: R.images.ic_hoidap,
  },
  {
    id: TYPE_FEATURES.KETQUA,
    title: "Kết quả khám bệnh",
    image: R.images.ic_ketqua,
  },
  {
    id: TYPE_FEATURES.NHATHUOC,
    title: "Nhà thuốc",
    image: R.images.ic_nhathuoc,
  },
  {
    id: TYPE_FEATURES.KIENTHUC,
    title: "Kiến thức sơ cấp cứu",
    image: R.images.ic_kienthuc,
  },
]
const Item = ({ item, index, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Image source={item.image} style={styles.icFeature} />
      <Text weight="normal" size="sm" style={{ width: WIDTH(96), textAlign: "center" }}>
        {item.title}
      </Text>
    </Pressable>
  )
}
export default function ItemUtilities() {
  const { returnNearestOrder } = useHookHome()
  const onPresItem = (index) => {
    switch (index) {
      case TYPE_FEATURES.TUVAN:
        navigate("CousultOnline")
        break
      case TYPE_FEATURES.KETQUA:
        navigate("ExaminationResults")
        break

      default:
        break
    }
  }
  console.log("returnNearestOrder", returnNearestOrder())
  const nearestOrder = returnNearestOrder()
  const timeFromNow = convertDuration(nearestOrder?.timeDifference)

  return (
    <Card style={styles.card}>
      <FlatList
        data={DATA_FEATURES}
        numColumns={3}
        renderItem={({ item, index }) => {
          return <Item item={item} index={index} onPress={() => onPresItem(index)} />
        }}
        ItemSeparatorComponent={() => <View style={{ height: HEIGHT(spacing.md) }} />}
      />
      {nearestOrder?.timeDifference && timeFromNow.day === 0 && (
        <List.Item
          style={styles.itemRemind}
          onPress={() => {
            navigate("DetailBooking", {
              id: nearestOrder?.id,
            })
          }}
          title={() => {
            return (
              <Text size="sm" weight="medium" style={{ color: colors.white }}>
                {timeFromNow?.day === 0 && timeFromNow.hour === 0 && timeFromNow.min < 5
                  ? "Đã đến giờ khám bệnh, vào khám"
                  : `Bạn có lịch khám sắp tới trong ${timeFromNow?.hour} giờ ${timeFromNow?.min} phút tới`}
              </Text>
            )
          }}
          left={() => {
            return (
              <Image
                source={R.images.call_reminder}
                style={styles.iconRemind}
                resizeMode="contain"
              />
            )
          }}
          right={() => {
            return <Icon icon="arrow_right_full" size={WIDTH(28)} />
          }}
        />
      )}
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
  iconRemind: {
    height: HEIGHT(32),
    width: WIDTH(44),
  },
  itemRemind: {
    backgroundColor: colors.main_7,
    borderRadius: 12,
    paddingLeft: WIDTH(spacing.sm),
    paddingRight: WIDTH(8),
    marginTop: HEIGHT(spacing.md),
  },
})
