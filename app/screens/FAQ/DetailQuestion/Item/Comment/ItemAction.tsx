import { StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { Divider } from "react-native-paper"
import { ILikeQuestion } from "@app/interface/question"
import { useSelector } from "@app/redux/reducers"
import { toggedLikeQuestion } from "@app/services/api/functions/question"
import { EToastType, showToastMessage } from "@app/utils/library"
import { MessageToast } from "@app/config/constants"
interface ItemProps {
  like: ILikeQuestion[]
  comment: number
  questionId: string
  onCommentPress: () => void
}
export default function ItemAction({ like, comment, questionId, onCommentPress }: ItemProps) {
  const user = useSelector((state) => state.userReducers.user)
  const [isLike, setIsLike] = useState(false)
  const [likeList, setLikeList] = useState<ILikeQuestion[]>([])

  useEffect(() => {
    const isLikeTemp = like.some((item) => item.userId === user?.id)
    setLikeList(like)
    setIsLike(isLikeTemp)
  }, [like])
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

    const likeRes = await toggedLikeQuestion(questionId)
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

  return (
    <View style={styles.container}>
      <Divider />
      <View style={styles.body}>
        <TouchableOpacity onPress={onPressLike} style={[styles.button, { marginRight: WIDTH(28) }]}>
          <Icon icon={isLike ? "heart_active" : "heart_comment"} size={WIDTH(20)} />
          <Text
            size="ba"
            weight="normal"
            style={{ color: colors.gray_7, marginLeft: WIDTH(spacing.xs) }}
          >
            {likeList?.length ?? 0} lượt thích
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCommentPress} style={styles.button}>
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
