import { StyleSheet, Image, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import R from "@app/assets"
export default function ItemEmpty() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={R.images.empty_noti} resizeMode="contain" />
      <Text size="ba" weight="normal" style={{ color: colors.gray_6 }}>
        Bạn chưa có thông báo nào!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: HEIGHT(200),
  },
  image: {
    height: WIDTH(132),
    width: WIDTH(132),
  },
})
