import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import { IReplyComment } from "@app/interface/question"
import AvatarDefault from "@app/components/avatar-default"
export default function ItemComment({ item }: { item: IReplyComment }) {
  const hasAvatar = item?.avatarUrl && item?.avatarUrl !== ""
  const titleName = item?.role === "patient" ? "B.n" : "B.s"
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        {hasAvatar ? (
          <Image source={{ uri: item?.avatarUrl }} style={styles.avatar} />
        ) : (
          <AvatarDefault name={item?.userName} size="medium" style={styles.avatar} />
        )}
        <View style={styles.boxComment}>
          <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
            {titleName} {item?.userName}
          </Text>
          <Text size="ba" weight="normal" style={{ color: colors.gray_7 }}>
            {item?.content}
          </Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.heart}>
          <Text size="ba" weight="normal" style={{ color: colors.gray_7, marginRight: WIDTH(4) }}>
            {item?.likes?.length > 0 ? item?.likes?.length : ""}
          </Text>
          <Icon icon="heart_comment" size={WIDTH(16)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: WIDTH(48),
    marginTop: HEIGHT(spacing.xs),
  },
  item: {
    flexDirection: "row",
  },
  avatar: {
    width: WIDTH(32),
    height: WIDTH(32),
    borderRadius: WIDTH(16),
    marginRight: WIDTH(spacing.xs),
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT(spacing.xxs),
    justifyContent: "flex-end",
  },
  heart: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxComment: {
    backgroundColor: colors.gray_1,
    borderRadius: 12,
    borderTopLeftRadius: 0,
    paddingVertical: HEIGHT(spacing.xs),
    paddingHorizontal: WIDTH(spacing.sm),
    width: WIDTH(250),
  },
})
