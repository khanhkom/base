import { StyleSheet, View } from "react-native"
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
interface ItemProps {
  item: Inotification
}
export default function ItemNotification({ item }: ItemProps) {
  const onPressItem = () => {
    console.log("item", item)
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
  return (
    <Card style={styles.card} mode="contained" onPress={onPressItem}>
      <List.Item
        left={() => {
          return (
            <View>
              <Icon icon={"noti_edit"} size={WIDTH(24)} />
              {/* <Icon icon={item.icon} size={WIDTH(24)} /> */}
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
})
