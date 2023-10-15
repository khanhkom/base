import { StyleSheet, View } from "react-native"
import React from "react"
import { Button, Card, List } from "react-native-paper"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import { navigate } from "@app/navigators/navigationUtilities"
import { IOrderHistory, STATUS_ORDER } from "@app/interface/order"
import moment from "moment"
import { LIST_ICON_BY_STATUS } from "@app/config/constants"
import { translate } from "@app/i18n/translate"
const DATA_FIELD_SCHEDULE = [
  {
    title: translate("history.doctor"),
  },
  {
    title: translate("history.time_exam"),
  },
  {
    title: translate("history.specialist"),
  },
  {
    title: translate("history.patient"),
  },
]

const ItemValue = ({ title, value }) => {
  return (
    <Text
      size="ba"
      weight="normal"
      style={{ color: colors.gray_6, marginTop: HEIGHT(8), paddingHorizontal: WIDTH(spacing.sm) }}
    >
      {title} <Text style={{ color: colors.gray_9 }}>{value}</Text>
    </Text>
  )
}

interface ItemProps {
  item: IOrderHistory
}
export default function ItemSchedule({ item }: ItemProps) {
  const itemData =
    LIST_ICON_BY_STATUS.find((it) => it.status === item?.status) || LIST_ICON_BY_STATUS[0]
  const isDoneSchedule = item?.status === STATUS_ORDER.rating_processing

  console.log("itemData_itemData", itemData)
  const returnDataByField = (index) => {
    switch (index) {
      case 0:
        return item?.doctor?.name
      case 1: {
        const time = `${moment(item?.timeRange?.from).format("HH:mm")} - ${moment(
          item?.timeRange?.to,
        ).format("HH:mm")}`
        const date = `${moment(item?.timeRange?.from).format("DD/MM/YYYY")}`
        return `${time}, ${date}`
      }
      case 2:
        return item?.specialist?.value
      case 3:
        return item?.patient?.name
      default:
        break
    }
  }
  return (
    <Card
      style={styles.card}
      mode="contained"
      onPress={() => {
        navigate("DetailBooking", {
          id: item.id,
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
        style={{
          paddingHorizontal: WIDTH(spacing.sm),
        }}
        title={() => {
          return (
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              {itemData.title}
            </Text>
          )
        }}
      />
      {DATA_FIELD_SCHEDULE.map((item, index) => {
        return <ItemValue key={index} title={item.title} value={returnDataByField(index)} />
      })}
      {isDoneSchedule ? (
        <Button
          style={styles.buttonRate}
          mode="contained"
          onPress={() => {
            navigate("RatingDocter", { id: item?.id, doctor: item?.doctor })
          }}
        >
          {translate("history.rating")}
        </Button>
      ) : (
        <View style={{ height: HEIGHT(spacing.sm) }} />
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  boxIcon: {
    alignItems: "center",
    backgroundColor: colors.blue_0,
    borderRadius: 8,
    height: WIDTH(32),
    justifyContent: "center",
    width: WIDTH(32),
  },
  buttonRate: {
    backgroundColor: colors.primary_8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderRadius: 0,
    marginTop: HEIGHT(spacing.md),
  },
  card: {
    backgroundColor: colors.white,
    marginBottom: HEIGHT(spacing.sm),
    marginHorizontal: WIDTH(spacing.md),
  },
})
