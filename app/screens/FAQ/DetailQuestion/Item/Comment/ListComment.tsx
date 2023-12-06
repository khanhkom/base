import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import ItemComment from "./ItemComment"
import { HEIGHT } from "@app/config/functions"
import colors from "@app/assets/colors"
import ItemAction from "./ItemAction"
import { ICommentData, IQuestion } from "@app/interface/question"

export default function ListComment({
  detail,
  comments,
  onReply,
  onDeleteComment,
  onCommentPress,
}: {
  detail: IQuestion
  comments: ICommentData[]
  onReply: (comment: ICommentData) => void
  onCommentPress: () => void
  onDeleteComment: (commentId: string) => void
}) {
  const listCommentFilter = comments?.filter((cm) => {
    const isDelete = cm?.deletedAt
    return !(isDelete && cm?.replies?.length === 0)
  })
  return (
    <View>
      <FlatList
        data={listCommentFilter}
        ListHeaderComponent={() => (
          <ItemAction
            questionId={detail?.id}
            like={detail?.likes ?? []}
            onCommentPress={onCommentPress}
            comment={listCommentFilter?.length ?? 0}
          />
        )}
        renderItem={({ item, index }) => {
          return (
            <ItemComment
              questionId={detail?.id}
              item={item}
              onReply={onReply}
              onDeleteComment={onDeleteComment}
            />
          )
        }}
        style={{ paddingBottom: HEIGHT(100), backgroundColor: colors.white }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
