import { StyleSheet, View, Image, Pressable, Alert } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import { ILikeQuestion, IReplyComment } from "@app/interface/question"
import AvatarDefault from "@app/components/avatar-default"
import { EToastType, showToastMessage } from "@app/utils/library"
import { MessageToast } from "@app/config/constants"
import { useSelector } from "@app/redux/reducers"
import { toggedLikeComment } from "@app/services/api/functions/question"
import { renderTextComment } from "./ItemTextComment"
import ImageView from "react-native-image-viewing"
import ModalDeleteComment from "./ModalDeleteComment"
import FastImage from "react-native-fast-image"
export default function ItemComment({
  item,
  questionId,
  onDeleteComment,
}: {
  item: IReplyComment
  questionId: string
  onDeleteComment: (id: string) => void
}) {
  const hasAvatar = item?.avatarUrl && item?.avatarUrl !== ""
  const titleName = item?.role === "patient" ? "B.n" : "B.s"
  const user = useSelector((state) => state.userReducers.user)

  const [isLike, setIsLike] = useState(false)
  const [likeList, setLikeList] = useState<ILikeQuestion[]>([])
  const [visible, setIsVisible] = useState(false)
  const refDel = useRef(null)
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
  const isDelete = !!item?.deletedAt
  const isOwner = user?.id === item?.userId

  const onDeleteHandle = () => {
    refDel?.current?.show()
  }
  return (
    <View style={styles.container}>
      <Pressable disabled={!isOwner || isDelete} onLongPress={onDeleteHandle} style={styles.item}>
        {hasAvatar ? (
          <Image source={{ uri: item?.avatarUrl }} style={styles.avatar} />
        ) : (
          <AvatarDefault name={item?.userName} size="medium" style={styles.avatar} />
        )}
        <View style={styles.boxComment}>
          <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
            {titleName} {item?.userName}
          </Text>
          {renderTextComment(item?.content)}
          {item?.commentFileUrl && item?.commentFileUrl !== "" && (
            <Pressable onPress={() => setIsVisible(true)}>
              <FastImage source={{ uri: item?.commentFileUrl }} style={styles.image} />
            </Pressable>
          )}
        </View>
      </Pressable>
      <View style={styles.bottomView}>
        <Pressable onPress={onPressLike} style={styles.heart}>
          <Text size="ba" weight="normal" style={{ color: colors.gray_7, marginRight: WIDTH(4) }}>
            {likeList?.length > 0 ? likeList?.length : ""}
          </Text>
          <Icon icon={isLike ? "heart_active" : "heart_comment"} size={WIDTH(16)} />
        </Pressable>
      </View>
      <ImageView
        images={[{ uri: item?.commentFileUrl }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <ModalDeleteComment
        onPress={() => {
          refDel?.current?.hide()
          onDeleteComment(item._id)
        }}
        ref={refDel}
      />
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
  image: {
    width: WIDTH(200),
    height: WIDTH(180),
    borderRadius: WIDTH(8),
    marginTop: WIDTH(spacing.xs),
  },
})
