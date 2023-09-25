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
interface ItemProps {
  item: IDocter
  onPress: () => void
  onPressBook: () => void
}
export default function ItemDocter({ item, onPress, onPressBook }: ItemProps) {
  return (
    <Card
      mode="contained"
      style={styles.item}
      contentStyle={{ flexDirection: "row" }}
      onPress={onPress}
    >
      <Image source={R.images.avatar_docter_rec} style={styles.avatar} resizeMode="center" />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          B.s {item?.name}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Khoa: {item?.specialist?.[0]?.value}
        </Text>
        <View style={styles.wrapperStar}>
          <Icon icon="ic_start" size={WIDTH(16)} />
          <Text weight="medium" size="xs" style={{ color: colors.gray_9 }}>
            {" "}
            {item?.averageRating}{" "}
          </Text>
          {/* <Text weight="normal" size="xs" style={{ color: colors.gray_7 }}>
            (120)
          </Text> */}
        </View>
        <View style={styles.flexRow}>
          <Text style={{ color: colors.gray_6 }} size="sm" weight="normal">
            Giá:{" "}
            <Text weight="semiBold" size="md" style={{ color: colors.primary }}>
              {item?.price} đ
            </Text>
          </Text>
          <Button mode="contained" onPress={onPressBook} style={styles.button}>
            Đặt khám
          </Button>
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
    marginTop: HEIGHT(spacing.xs),
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
  textDes: { color: colors.gray_6, marginTop: 2 },
  wrapperStar: {
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(4),
    borderRadius: 20,
    backgroundColor: colors.yellow_0,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: HEIGHT(spacing.xs),
  },
  button: {
    borderRadius: WIDTH(8),
    margin: 0,
  },
})
