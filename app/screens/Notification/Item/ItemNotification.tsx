import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { Card, List } from "react-native-paper"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import moment from "moment"
import { Inotification } from "@app/interface/notifications"
import { navigate } from "@app/navigators/navigationUtilities"
import R from "@app/assets"
interface ItemProps {
  item: Inotification
}
const DATA_ICON_NOTI = [
  {
    iconName: "updateOrder",
    icon: R.images.updateOrder,
  },
  {
    iconName: "updateOrder",
    icon: R.images.haveResult,
  },
]
export default function ItemNotification({ item }: ItemProps) {
  console.log("item", item?.icon)
  const onPressItem = () => {
    switch (item?.clickAction?.actionType) {
      case "open_order":
        navigate("DetailBooking", {
          id: item?.clickAction?.data?.orderId,
        })
        break

      default:
        break
    }
  }
  const returnIcon = (type) => {
    switch (type) {
      case "haveResult":
        return R.images.haveResult
      case "updateOrder":
        return R.images.updateOrder
      default:
        return R.images.updateOrder
    }
  }
  return (
    <Card style={styles.card} mode="contained" onPress={onPressItem}>
      <List.Item
        left={() => {
          return (
            <View>
              <Image source={returnIcon(item?.icon)} style={styles.icon} resizeMode="contain" />
            </View>
          )
        }}
        style={{ paddingRight: 0 }}
        title={() => {
          return (
            <View>
              <Text
                size="md"
                weight="medium"
                style={{ color: colors.gray_9, marginBottom: HEIGHT(spacing.xxs) }}
              >
                {item.title}
              </Text>
              <Text
                size="ba"
                weight="normal"
                style={{ color: colors.gray_7, marginBottom: HEIGHT(spacing.xxs) }}
              >
                {item.body}
              </Text>
              <Text size="sm" style={{ color: colors.gray_6, textAlign: "right" }}>
                {moment(item?.createdAt).format("HH:mm:ss, DD/MM/YYYY")}
              </Text>
            </View>
          )
        }}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
  },
})
