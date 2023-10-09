import { StyleSheet, View, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button, Card } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
interface ItemProps {
  onPress: () => void
  index: number
}
const DATA = [
  {
    title: "Răng Hàm Mặt",
    icon: R.images.features_1,
  },
  {
    title: "Nhi khoa",
    icon: R.images.features_2,
  },
  {
    title: "Da liễu",
    icon: R.images.features_3,
  },
]
export default function ItemHistory({ onPress, index }: ItemProps) {
  return (
    <Card
      mode="contained"
      style={styles.item}
      contentStyle={{ flexDirection: "row" }}
      onPress={() => {
        onPress && onPress()
      }}
    >
      <Image source={DATA[index].icon} style={styles.avatar} resizeMode="center" />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          B.s Nguyễn Văn B
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Thời gian khám: <Text style={{ color: colors.gray_9 }}>27/02/2006</Text>
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Chẩn đoán: <Text style={{ color: colors.gray_9 }}>Kích ứng da do thời tiết</Text>
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
