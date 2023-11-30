import { StyleSheet, View, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button, Card } from "react-native-paper"
import { Icon } from "@app/components/Icon"
import { IDocter } from "@app/interface/docter"
import { translate } from "@app/i18n/translate"
interface ItemProps {
  item: IDocter
  onPress: () => void
  onPressBook: () => void
}
export default function ItemDocter({ item, onPress, onPressBook }: ItemProps) {
  return (
    <Card mode="contained" style={styles.item} contentStyle={styles.contentCard} onPress={onPress}>
      <Image source={R.images.avatar_docter_rec} style={styles.avatar} resizeMode="contain" />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          {translate("doctor.doctor")} {item?.name}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          {translate("doctor.specialist")}: {item?.specialist?.[0]?.value}
        </Text>
        <View style={styles.wrapperStar}>
          <Icon icon="ic_start" size={WIDTH(16)} />
          <Text weight="medium" size="xs" style={{ color: colors.gray_9 }}>
            {" "}
            {item?.averageRating}{" "}
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={{ color: colors.gray_6, width: WIDTH(100) }} size="sm" weight="normal">
            {translate("doctor.price")}:{" "}
            <Text weight="semiBold" size="md" style={{ color: colors.primary }}>
              {item?.price} đ
            </Text>
          </Text>
          <Button mode="contained" onPress={onPressBook} style={styles.button}>
            {translate("doctor.book")}
          </Button>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: "center",
    height: HEIGHT(120),
    marginRight: WIDTH(spacing.sm),
    width: WIDTH(90),
  },
  button: {
    borderRadius: WIDTH(8),
    margin: 0,
  },
  contentCard: { flexDirection: "row" },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: HEIGHT(spacing.xs),
    width: WIDTH(217),
  },
  item: {
    backgroundColor: colors.white,
    flexDirection: "row",
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },
  textDes: { color: colors.gray_6, marginTop: 2 },
  textName: {
    color: colors.gray_9,
    marginBottom: HEIGHT(2),
    marginTop: HEIGHT(8),
    width: WIDTH(220),
  },
  wrapperStar: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.yellow_0,
    borderRadius: 20,
    flexDirection: "row",
    marginTop: HEIGHT(spacing.xs),
    paddingHorizontal: WIDTH(4),
    paddingVertical: HEIGHT(2),
  },
})
