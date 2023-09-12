import { StyleSheet, View, Image } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button, Card } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
export default function ItemRecord() {
  return (
    <Card
      mode="contained"
      style={styles.item}
      contentStyle={{ flexDirection: "row" }}
      onPress={() => {
        navigate("DocterInformation")
      }}
    >
      <Image source={R.images.avatar_patient} style={styles.avatar} resizeMode="center" />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          Nguyễn Văn A
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Ngày sinh: <Text style={{ color: colors.gray_9 }}>27/02/2006</Text>
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Giới tính: <Text style={{ color: colors.gray_9 }}>Nam</Text>
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
    width: WIDTH(72),
    height: HEIGHT(72),
    alignSelf: "center",
    marginRight: WIDTH(spacing.sm),
  },
  textName: {
    color: colors.gray_9,
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(2),
  },
  textDes: { color: colors.gray_6, marginTop: 2 },
})
