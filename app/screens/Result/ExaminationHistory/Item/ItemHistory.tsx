import { StyleSheet, View, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button, Card } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
import { IOrderResultItem } from "@app/interface/result"
import useHookDetailBooking from "@app/screens/Booking/DetailBooking/useHookDetailBooking"
import moment from "moment"
interface ItemProps {
  index: number
  item: IOrderResultItem
}

export default function ItemHistory({ index, item }: ItemProps) {
  const { detailOrder } = useHookDetailBooking(item?.orderDetail?.orderId)
  console.log("item::", item)
  return (
    <Card
      mode="contained"
      style={styles.item}
      contentStyle={{ flexDirection: "row" }}
      onPress={() => {
        navigate("DetailExamination", {
          id: item?.orderDetail?.orderId,
          specialist: { value: detailOrder?.specialist?.value },
        })
      }}
    >
      <Image source={R.images.features_1} style={styles.avatar} resizeMode="center" />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          B.s {detailOrder?.doctor?.name ?? ""}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Thời gian khám:{" "}
          <Text style={{ color: colors.gray_9 }}>
            {moment(detailOrder?.timeRange?.from).format("DD/MM/YYYY")}
          </Text>
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Chẩn đoán: <Text style={{ color: colors.gray_9 }}>{item?.description}</Text>
        </Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.white,
    marginTop: HEIGHT(spacing.sm),
    flexDirection: "row",
    paddingHorizontal: WIDTH(spacing.sm),
  },
  avatar: {
    width: WIDTH(32),
    height: HEIGHT(32),
    marginRight: WIDTH(spacing.sm),
  },
  textName: {
    color: colors.gray_9,
    marginBottom: HEIGHT(2),
  },
  textDes: { color: colors.gray_6, marginTop: 2 },
})
