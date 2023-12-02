import { StyleSheet, View, Image, FlatList, Pressable, Alert } from "react-native"
import React, { useEffect, useState } from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import ItemReply from "./ItemReply"
import { ICommentData, ILikeQuestion } from "@app/interface/question"
import AvatarDefault from "@app/components/avatar-default"
import { useSelector } from "@app/redux/reducers"
import { toggedLikeComment } from "@app/services/api/functions/question"
import { EToastType, showToastMessage } from "@app/utils/library"
import { MessageToast } from "@app/config/constants"

type ItemCommentProps = {
  item: ICommentData
  onReply: (comment: ICommentData) => void
  onDeleteComment: (commentId: string) => void
  questionId: string
}

export default function ItemComment({
  item,
  onReply,
  onDeleteComment,
  questionId,
}: ItemCommentProps) {
  const hasAvatar = item?.avatarUrl && item?.avatarUrl !== ""
  const titleName = item?.role === "patient" ? "B.n" : "B.s"
  const user = useSelector((state) => state.userReducers.user)
  const isOwner = user?.id === item?.userId
  const isDelete = !!item?.deletedAt

  const [isLike, setIsLike] = useState(false)
  const [likeList, setLikeList] = useState<ILikeQuestion[]>([])
  useEffect(() => {
    const isLikeTemp = (item?.likes ?? []).some((item) => item.userId === user?.id)
    setLikeList(item?.likes ?? [])
    setIsLike(isLikeTemp)
  }, [item.likes])

  const onPressLike = async () => {
    let newIsLike = false
    let newLikeList = [...likeList]

    if (isLike) {
      newIsLike = false
      newLikeList = likeList.filter((lk) => lk.userId !== user?.id)
    } else {
      newIsLike = true
      newLikeList = [...likeList, { id: "", userId: user?.id }]
    }

    setIsLike(newIsLike)
    setLikeList(newLikeList)

    const likeRes = await toggedLikeComment(questionId, item.id)
    if (likeRes.status !== 200) {
      showToastMessage(MessageToast.apiError, EToastType.ERROR)
      if (isLike) {
        newLikeList = [...likeList, { id: "", userId: user?.id }]
      } else {
        newLikeList = likeList.filter((lk) => lk.userId !== user?.id)
      }
      setIsLike(!isLike)
      setLikeList(newLikeList)
    }
  }
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
      <Pressable disabled={!isOwner || isDelete} style={styles.item} onLongPress={onDeleteHandle}>
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
        <Pressable onPress={onPressLike} style={styles.heart}>
          <Text size="ba" weight="normal" style={{ color: colors.gray_7, marginRight: WIDTH(4) }}>
            {likeList?.length > 0 ? likeList?.length : ""}
          </Text>
          <Icon icon={isLike ? "heart_active" : "heart_comment"} size={WIDTH(16)} />
        </Pressable>
      </View>
      {item?.replies?.length > 0 && (
        <FlatList
          data={item?.replies}
          renderItem={({ item, index }) => {
            return <ItemReply questionId={questionId} item={item} />
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
