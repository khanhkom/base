import { StyleSheet, View, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Card } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
import { IDocter } from "@app/interface/docter"
export default function GeneralInfor({ data }: { data: IDocter }) {
  return (
    <Card
      mode="contained"
      style={styles.item}
      contentStyle={{ flexDirection: "row" }}
      onPress={() => {
        navigate("DocterInformation")
      }}
    >
      <Image source={R.images.avatar_docter_rec} style={styles.avatar} resizeMode="center" />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          B.s {data?.name}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Khoa: {data?.specialist?.[0]?.value}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Trình độ: Thạc sĩ
        </Text>
        <View style={styles.flexRow}>
          <Text style={{ color: colors.gray_6 }} size="sm" weight="normal">
            Giá khám:{" "}
            <Text weight="semiBold" size="md" style={{ color: colors.primary }}>
              {data?.price} đ
            </Text>
          </Text>
        </View>
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
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: WIDTH(217),
    marginTop: HEIGHT(spacing.md),
  },
  avatar: {
    width: WIDTH(90),
    height: HEIGHT(120),
    alignSelf: "center",
    marginRight: WIDTH(spacing.sm),
  },
  textName: {
    color: colors.gray_9,
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(2),
  },
  textDes: { color: colors.gray_6, marginTop: 4 },
})
