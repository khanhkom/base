import { StyleSheet, Image, View } from "react-native"
import React from "react"
import { WIDTH } from "@app/config/functions"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import R from "@app/assets"
interface ItemProps {
  title: string
}
export default function ItemEmpty({ title }: ItemProps) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={R.images.empty} resizeMode="contain" />
      <Text size="ba" weight="normal" style={{ color: colors.gray_6 }}>
        {title}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: WIDTH(132),
    width: WIDTH(132),
  },
})
