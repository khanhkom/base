import { StyleSheet, View, Image, ScrollView, Keyboard, Platform } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import FileAttachment from "./Item/FileAttachment"
import ItemSpecialList from "./Item/ItemSpecialList"
import ItemAnswer from "./Item/ItemAnswer"
import { Icon } from "@app/components/Icon"
import { EStatusQuestion, ICommentData, IQuestion } from "@app/interface/question"
import {
  createCommentQuestion,
  deleteCommentQuestion,
  getDeatilQuestion,
} from "@app/services/api/functions/question"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import ItemInputToolbar from "./Item/InputToolbar"
import ListComment from "./Item/Comment/ListComment"
import { useSelector } from "@app/redux/reducers"
import { EToastType, showToastMessage } from "@app/utils/library"
import { mentionRegEx } from "react-native-controlled-mentions"
import { STATUS_QUESTION } from "@app/config/constants"
import ItemHeadStatus from "./Item/ItemHeadStatus"
import useHookApiComment from "./useHookCommetApi"
import { Asset } from "react-native-image-picker"

interface IScreenParams {
  route: {
    params: {
      id: string
    }
  }
}

export default function DetailQuestion({ route }: IScreenParams) {
  const [detail, setDetail] = useState<IQuestion>(null)
  // const [comments, setComments] = useState<ICommentData[]>(null)
  const [replyComment, setReplyComment] = useState<ICommentData>(null)

  const refScrollView = useRef(null)
  const refInput = useRef(null)
  const [loading, setLoading] = useState(true)
  const [loadingCmt, setLoadingComment] = useState(false)
  const id = route?.params?.id
  const { comments, isLoading, loadNewComment, loadMore } = useHookApiComment(id)
  useEffect(() => {
    async function getDetailQues() {
      setLoading(true)
      const question = await getDeatilQuestion(id)
      if (question?.status === 200) {
        setDetail(question?.data ?? null)
        // setComments(question?.data?.comments ?? [])
      }
      setLoading(false)
    }
    getDetailQues()
  }, [])

  const isWaiting = !detail?.isAnswered
  console.log("detail_detail::", route.params.id)
  // const isAnsewered = detail?.status === EStatusQuestion.ANSWERED
  const onCommentPost = async (comment: string, listImage?: Asset[]) => {
    setLoadingComment(true)
    const body = {
      content: comment,
    }
    const formData = new FormData()
    formData.append("content", comment)
    const isReplyComment = replyComment?._id
    if (isReplyComment) {
      Object.assign(body, {
        replyToId: replyComment?._id,
      })
      formData.append("replyToId", replyComment?._id)
    }
    const listUser = detail?.listUser ?? []
    const mentions = comment.match(mentionRegEx)
    const idRegex = /\(([^)]+)\)/
    if (mentions && mentions?.length > 0) {
      const idList = mentions.map((mention) => {
        const matches = mention.match(idRegex)
        const userId = matches ? matches[1] : null

        return {
          userId,
          role: listUser.find((user) => user.userId === userId)?.role,
        }
      })
      const tags = idList.filter((it) => it?.userId !== null)
      if (tags && tags.length > 0) {
        Object.assign(body, {
          tags,
        })
        console.log("tags_tags", tags)
        tags.forEach((tag, index) => {
          formData.append(`tags[${index}][userId]`, tag.userId)
          formData.append(`tags[${index}][role]`, tag.role)
        })
        // formData.append("tags", tags)
      }
      // console.log("mentions_mentions", mentions, tags)
    }
    if (listImage.length > 0) {
      listImage.map((item) => {
        const bodyImage = {
          name: item.fileName || item.uri,
          type: item.type,
          uri: Platform.OS === "ios" ? item.uri.replace("file://", "") : item.uri,
        }
        formData.append("commentFiles", bodyImage)
      })
    }
    const commentRes = await createCommentQuestion(id, formData)
    setLoadingComment(false)
    console.log("commentRes_commentRes", commentRes)
    if (commentRes?.status === 201) {
      // loadCommentByPageAPI()
      loadNewComment()
      if (!isReplyComment) {
        // setTimeout(() => {
        //   refScrollView?.current?.scrollToEnd?.({ animated: true })
        // }, 200)
      } else {
        setReplyComment(null)
      }
    } else {
      showToastMessage("Có lỗi xảy ra vui lòng thử lại!", EToastType.ERROR)
    }
  }
  const onReplyPress = (comment: ICommentData) => {
    setReplyComment(comment)
    refInput.current?.focus()
  }
  const onCommentPress = () => {
    refInput.current?.focus()
  }
  const onReplyCancel = () => {
    setReplyComment(null)
    Keyboard.dismiss()
  }

  const onDeleteComment = async (commentId: string) => {
    const commentRes = await deleteCommentQuestion(id, commentId)
    if (commentRes?.status === 200) {
      // const question = await getDeatilQuestion(id)
      // setComments(question?.data?.comments)
      // loadCommentByPageAPI()
      loadNewComment()
      showToastMessage("Xóa thành công!", EToastType.SUCCESS)
    } else {
      showToastMessage("Có lỗi xảy ra vui lòng thử lại!", EToastType.ERROR)
    }
  }
  const ItemQuestionInfo = () => {
    return (
      <View style={styles.body}>
        <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
          {detail?.title}
        </Text>
        <Text
          size="ba"
          weight="normal"
          style={{ color: colors.gray_9, marginTop: HEIGHT(spacing.xs) }}
        >
          {detail?.content}
        </Text>
        <FileAttachment data={detail?.patientFiles ?? []} />
        <ItemSpecialList data={detail?.specialist ?? []} />
      </View>
    )
  }
  if (loading) {
    return <LoadingScreen />
  }
  if (!detail?.isAnswered) {
    return (
      <View style={styles.container}>
        <Header leftIcon="arrow_left" title={"Câu hỏi"} backgroundColor={colors.white} />
        {isWaiting && <ItemHeadStatus status={detail?.status} />}
        <ItemQuestionInfo />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title={"Câu hỏi"} backgroundColor={colors.white} />
      <View style={{flex:1}}>
        <ListComment
          renderHeaderComponent={() => {
            return (
              <View>
                <ItemQuestionInfo />
                <ItemAnswer item={detail} />
              </View>
            )
          }}
          isLoading={isLoading}
          loadMore={loadMore}
          detail={detail}
          comments={comments}
          onReply={onReplyPress}
          onCommentPress={onCommentPress}
          onDeleteComment={onDeleteComment}
        />
      </View>
      <ItemInputToolbar
        replyComment={replyComment}
        ref={refInput}
        onSend={onCommentPost}
        onReplyCancel={onReplyCancel}
        listUser={detail?.listUser ?? []}
        loading={loadingCmt}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  body: {
    paddingHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.white,
  },
})
