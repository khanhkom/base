import { StyleSheet, View, Image, ScrollView, Keyboard } from "react-native"
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

interface IScreenParams {
  route: {
    params: {
      id: string
    }
  }
}

export default function DetailQuestion({ route }: IScreenParams) {
  const [detail, setDetail] = useState<IQuestion>(null)
  const [comments, setComments] = useState<ICommentData[]>(null)
  const [replyComment, setReplyComment] = useState<ICommentData>(null)
  const refScrollView = useRef(null)
  const refInput = useRef(null)
  const [loading, setLoading] = useState(true)
  const id = route?.params?.id
  console.log("id:::", detail)
  useEffect(() => {
    async function getDetailQues() {
      setLoading(true)
      const question = await getDeatilQuestion(id)
      console.log("question::", question?.data)
      if (question?.status === 200) {
        setDetail(question?.data ?? null)
        setComments(question?.data?.comments ?? [])
      }
      setLoading(false)
    }
    getDetailQues()
  }, [])
  const isWaiting = !detail?.isAnswered
  console.log("detail_detail::", detail)
  // const isAnsewered = detail?.status === EStatusQuestion.ANSWERED
  const onCommentPost = async (comment: string) => {
    const body = {
      content: comment,
    }
    const isReplyComment = replyComment?._id
    if (isReplyComment) {
      Object.assign(body, {
        replyToId: replyComment?._id,
      })
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
      }
      console.log("mentions_mentions", mentions, tags)
    }

    const commentRes = await createCommentQuestion(id, body)
    console.log("commentRes_commentRes", commentRes)
    if (commentRes?.status === 201) {
      const question = await getDeatilQuestion(id)
      setComments(question?.data?.comments)
      if (!isReplyComment) {
        setTimeout(() => {
          refScrollView?.current?.scrollToEnd?.({ animated: true })
        }, 200)
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
      const question = await getDeatilQuestion(id)
      setComments(question?.data?.comments)
      showToastMessage("Xóa thành công!", EToastType.SUCCESS)
    } else {
      showToastMessage("Có lỗi xảy ra vui lòng thử lại!", EToastType.ERROR)
    }
  }
  if (loading) {
    return <LoadingScreen />
  }
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title={"Câu hỏi"} backgroundColor={colors.white} />
      <ScrollView ref={refScrollView}>
        {isWaiting && <ItemHeadStatus status={detail?.status} />}

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
        {detail?.isAnswered && (
          <View>
            <ItemAnswer item={detail} />
            <ListComment
              detail={detail}
              comments={comments}
              onReply={onReplyPress}
              onCommentPress={onCommentPress}
              onDeleteComment={onDeleteComment}
            />
          </View>
        )}
      </ScrollView>
      {detail?.isAnswered && (
        <ItemInputToolbar
          replyComment={replyComment}
          ref={refInput}
          onSend={onCommentPost}
          onReplyCancel={onReplyCancel}
          listUser={detail?.listUser ?? []}
        />
      )}
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
  head: {
    backgroundColor: colors.orange_0,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
    flexDirection: "row",
    marginBottom: HEIGHT(spacing.sm),
  },
})
