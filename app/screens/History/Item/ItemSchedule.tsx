import { StyleSheet, View } from "react-native"
import React from "react"
import { Button, Card, List } from "react-native-paper"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import { navigate } from "@app/navigators/navigationUtilities"
const ItemValue = ({ title, value }) => {
  return (
    <Text size="ba" weight="normal" style={{ color: colors.gray_6, marginTop: HEIGHT(8) }}>
      {title} <Text style={{ color: colors.gray_9 }}>{value}</Text>
    </Text>
  )
}
const DATA_FIELD_SCHEDULE = [
  {
    title: "Bác sĩ: ",
    value: "Nguyễn Văn A",
  },
  {
    title: "Thời gian khám: ",
    value: "16:00 - 16:15, 25/09/2023",
  },
  {
    title: "Chuyên khoa: ",
    value: "Tai - Mũi - Họng",
  },
  {
    title: "Bệnh nhân: ",
    value: "16:00 - 16:30",
  },
]
const LIST_ICON_BY_STATUS = [
  {
    title: "Đã đặt khám",
    icon: "ic_status_booked",
    color: colors.primary,
    backgroundColor: colors.blue_0,
  },
  {
    title: "Sẵn sàng khám",
    icon: "ic_status_booked",
    color: colors.primary,
    backgroundColor: colors.blue_0,
  },
  {
    title: "Đã khám",
    icon: "tick_circle",
    color: colors.green_7,
    backgroundColor: colors.green_0,
  },
  {
    title: "Đã hủy",
    icon: "refresh",
    color: colors.red_5,
    backgroundColor: colors.red_0,
  },
]
interface ItemProps {
  item: {
    docter: string
    time: string
    specialist: string
    patient: string
    status: number
  }
}
export default function ItemSchedule({ item }: ItemProps) {
  const itemData = LIST_ICON_BY_STATUS[item.status]
  const isDoneSchedule = item?.status === 2
  return (
    <Card
      style={styles.card}
      mode="contained"
      onPress={() => {
        navigate("DetailBooking", {
          status: item.status,
        })
      }}
    >
      <List.Item
        left={() => {
          return (
            <View style={[styles.boxIcon, { backgroundColor: itemData.backgroundColor }]}>
              <Icon icon={itemData.icon} size={WIDTH(20)} color={itemData.color} />
            </View>
          )
        }}
        title={() => {
          return (
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              {LIST_ICON_BY_STATUS[item.status].title}
            </Text>
          )
        }}
      />
      {DATA_FIELD_SCHEDULE.map((item, index) => {
        return <ItemValue key={index} title={item.title} value={item.value} />
      })}
      {isDoneSchedule && (
        <Button
          style={styles.buttonRate}
          mode="contained"
          onPress={() => {
            navigate("RatingDocter")
          }}
        >
          Đánh giá
        </Button>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  boxIcon: {
    height: WIDTH(32),
    width: WIDTH(32),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_0,
  },
  buttonRate: {
    borderRadius: 8,
    marginTop: HEIGHT(spacing.md),
  },
})
