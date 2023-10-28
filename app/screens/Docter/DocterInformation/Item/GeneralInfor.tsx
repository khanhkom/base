import { StyleSheet, View, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Card } from "react-native-paper"
import { IDocter } from "@app/interface/docter"
import { translate } from "@app/i18n/translate"
export default function GeneralInfor({ data }: { data: IDocter }) {
  return (
    <Card
      mode="contained"
      style={styles.item}
      contentStyle={{ flexDirection: "row" }}
      onPress={() => {}}
    >
      <Image
        source={data?.avatarUrl ? { uri: data?.avatarUrl } : R.images.avatar_docter_rec}
        style={styles.avatar}
        resizeMode='contain'
      />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          {translate("doctor.doctor")} {data?.name}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          {translate("doctor.specialist")}: {data?.specialist?.[0]?.value}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          {translate("doctor.level")}: {data?.degree}
        </Text>
        <View style={styles.flexRow}>
          <Text style={{ color: colors.gray_6 }} size="sm" weight="normal">
            {translate("doctor.price_exam")}:{" "}
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
