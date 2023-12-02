import { StyleSheet, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { Divider } from "react-native-paper"
interface ItemProps {
  like: number
  comment: number
}
export default function ItemAction({ like, comment }: ItemProps) {
  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.body}>
        <TouchableOpacity style={[styles.button, { marginRight: WIDTH(28) }]}>
          <Icon icon="heart_comment" size={WIDTH(20)} />
          <Text
            size="ba"
            weight="normal"
            style={{ color: colors.gray_7, marginLeft: WIDTH(spacing.xs) }}
          >
            {like} lượt thích
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon icon="comment" size={WIDTH(20)} />
          <Text
            size="ba"
            weight="normal"
            style={{ color: colors.gray_7, marginLeft: WIDTH(spacing.xs) }}
          >
            {comment} thảo luận
          </Text>
        </TouchableOpacity>
      </View>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(spacing.xxs),
  },
  body: {
    flexDirection: "row",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: HEIGHT(spacing.sm),
    width: WIDTH(156),
  },
})
