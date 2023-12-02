import { StyleSheet, View, Image, FlatList, Pressable, Alert } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import ItemReply from "./ItemReply"
import { ICommentData } from "@app/interface/question"
import AvatarDefault from "@app/components/avatar-default"
import { useSelector } from "@app/redux/reducers"
export default function ItemComment({
  item,
  onReply,
  onDeleteComment,
}: {
  item: ICommentData
  onReply: (comment: ICommentData) => void
  onDeleteComment: (commentId: string) => void
}) {
  const hasAvatar = item?.avatarUrl && item?.avatarUrl !== ""
  const titleName = item?.role === "patient" ? "B.n" : "B.s"
  const user = useSelector((state) => state.userReducers.user)
  const isOwner = user?.id === item?.userId
  const onDeleteHandle = () => {
    Alert.alert("Xóa comment", "Bạn muốn xóa comment?", [
      {
        text: "Hủy",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Xóa", onPress: () => onDeleteComment(item._id) },
    ])
  }
  return (
    <View style={styles.container}>
      <Pressable disabled={!isOwner} style={styles.item} onLongPress={onDeleteHandle}>
        {hasAvatar ? (
          <Image source={{ uri: item?.avatarUrl }} style={styles.avatar} />
        ) : (
          <AvatarDefault name={item.userName} size="medium" style={styles.avatar} />
        )}
        <View style={styles.boxComment}>
          <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
            {titleName} {item?.userName}
          </Text>
          <Text size="ba" weight="normal" style={{ color: colors.gray_7 }}>
            {item?.content}
          </Text>
          {item?.avatarUrl && item?.avatarUrl !== "" && (
            <Image source={R.images.avatar_docter} style={styles.image} />
          )}
        </View>
      </Pressable>
      <View style={styles.bottomView}>
        <Text
          size="ba"
          weight="normal"
          onPress={() => {
            onReply(item)
          }}
          style={{ color: colors.primary, marginRight: WIDTH(32) }}
        >
          Trả lời
        </Text>
        <View style={styles.heart}>
          <Text size="ba" weight="normal" style={{ color: colors.gray_7, marginRight: WIDTH(4) }}>
            {item?.likes?.length > 0 ? item?.likes?.length : ""}
          </Text>
          <Icon icon="heart_comment" size={WIDTH(16)} />
        </View>
      </View>
      {item?.replies?.length > 0 && (
        <FlatList
          data={item?.replies}
          renderItem={({ item, index }) => {
            return <ItemReply item={item} />
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.xs),
  },
  item: {
    flexDirection: "row",
  },
  avatar: {
    width: WIDTH(40),
    height: WIDTH(40),
    borderRadius: WIDTH(20),
    marginRight: WIDTH(spacing.xs),
  },
  image: {
    width: WIDTH(271),
    height: WIDTH(180),
    borderRadius: WIDTH(8),
    marginTop: WIDTH(spacing.xs),
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
    width: WIDTH(295),
  },
})
