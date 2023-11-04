import { Image, StyleSheet, View } from "react-native"
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
import R from "@app/assets"

const ItemValue = ({ title, value }) => {
  return (
    <Text size="ba" weight="normal" style={{ color: colors.gray_6, marginTop: HEIGHT(8) }}>
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
      <View style={styles.flexRow}>
        <Image source={R.images.avatar_docter_rec} style={styles.avatar} resizeMode="contain" />
        <View>
          <View>
            <Text weight="medium" size="md" style={styles.textName}>
              B.s {item?.doctor?.name}
            </Text>
            <View style={[styles.boxIcon, { backgroundColor: itemData.backgroundColor }]}>
              {/* <Icon icon={itemData.icon} size={WIDTH(16)} color={itemData.color} /> */}
              <Image source={itemData.image} style={styles.icStatus} resizeMode="contain" />

              <Text
                size="sm"
                weight="normal"
                style={{ color: itemData.color || colors.gray_9, marginLeft: WIDTH(spacing.xxs) }}
              >
                {itemData.title}
              </Text>
            </View>

            <ItemValue
              title="Ngày khám:"
              value={`${moment(item?.timeRange?.from).format("DD/MM/YYYY")}`}
            />
            <ItemValue
              title="Thời gian:"
              value={`${moment(item?.timeRange?.from).format("HH:mm")} - ${moment(
                item?.timeRange?.to,
              ).format("HH:mm")}`}
            />
          </View>
        </View>
      </View>
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
    backgroundColor: colors.blue_0,
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
    paddingLeft: WIDTH(spacing.xxs),
    paddingVertical: HEIGHT(spacing.xxs),
    paddingRight: WIDTH(spacing.xs),
    marginTop: HEIGHT(spacing.xxs),
  },
  buttonRate: {
    backgroundColor: colors.primary_8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderRadius: 0,
    marginTop: HEIGHT(spacing.md),
  },
  textName: {
    color: colors.gray_9,
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(2),
  },
  card: {
    backgroundColor: colors.white,
    marginBottom: HEIGHT(spacing.sm),
    marginHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(spacing.sm),
  },
  flexRow: {
    flexDirection: "row",
  },
  avatar: {
    width: WIDTH(90),
    height: HEIGHT(120),
    alignSelf: "center",
    marginHorizontal: WIDTH(spacing.sm),
  },
  icStatus: {
    height: WIDTH(16),
    width: WIDTH(16),
    marginRight: WIDTH(spacing.xxs),
  },
})
