import { FlatList, StyleSheet, View, Image } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Text } from "@app/components/Text"
import { Icon } from "@app/components/Icon"
import { spacing } from "@app/theme/spacing"
import { Card } from "react-native-paper"
import R from "@app/assets"
import colors from "@app/assets/colors"
const Item = ({ item, index }) => {
  return (
    <Card mode="contained" style={styles.item}>
      <Image source={R.images.avatar_docter} style={styles.avatar} resizeMode="contain" />
      <Text weight="medium" size="ba" style={styles.textName}>
        B.s Nguyễn Văn A
      </Text>
      <Text weight="normal" size="sm" style={styles.textDes}>
        Nội Tim mạch
      </Text>
      <View style={styles.wrapperStar}>
        <Icon icon="ic_start" size={WIDTH(16)} />
        <Text weight="medium" size="xs" style={{ color: colors.gray_9 }}>
          4,7
        </Text>
        <Text weight="normal" size="xs" style={{ color: colors.gray_7 }}>
          (120)
        </Text>
      </View>
    </Card>
  )
}
export default function TopDocter() {
  return (
    <View>
      <View style={styles.flexRow}>
        <Text weight="semiBold" size="xl">
          Gói dịch vụ nổi bật
        </Text>
        <Icon icon="arrow_circle_right" size={WIDTH(24)} />
      </View>
      <FlatList
        style={{ paddingLeft: WIDTH(spacing.md), marginTop: HEIGHT(spacing.sm) }}
        horizontal
        data={[...new Array(4).keys()]}
        renderItem={({ item, index }) => {
          return <Item item={item} index={index} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(32),
  },
  item: {
    marginRight: WIDTH(spacing.md),
    width: WIDTH(162),
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  avatar: {
    height: WIDTH(72),
    width: WIDTH(72),
    borderRadius: 12,
    alignSelf: "center",
  },
  textName: {
    color: colors.gray_9,
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(2),
    textAlign: "center",
  },
  textDes: { color: colors.gray_6, textAlign: "center" },
  wrapperStar: {
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(4),
    borderRadius: 20,
    backgroundColor: colors.yellow_0,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: HEIGHT(spacing.xs),
  },
})
