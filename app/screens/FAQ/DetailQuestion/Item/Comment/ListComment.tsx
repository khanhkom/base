import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import React, { LegacyRef, Ref, useRef } from "react"
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
  renderHeaderComponent,
  isLoading,
  loadMore,
  refScrollView,
}: {
  detail: IQuestion
  comments: ICommentData[]
  onReply: (comment: ICommentData) => void
  onCommentPress: () => void
  onDeleteComment: (commentId: string) => void
  renderHeaderComponent: () => JSX.Element
  isLoading: boolean
  loadMore: () => void
  refScrollView: LegacyRef<FlatList>
}) {
  const listCommentFilter = comments?.filter((cm) => {
    const isDelete = cm?.deletedAt
    return !(isDelete && cm?.replies?.length === 0)
  })
  const hasScrolled = useRef(false)
  console.log("listCommentFilter__", listCommentFilter?.length)
  // console.log("listCommentFilter_listCommentFilter", listCommentFilter)

  return (
    <View
    >
      <FlatList
        data={listCommentFilter}
        onEndReached={() => {
          if (!hasScrolled.current) return
          loadMore()
          console.log("onEndReached::")
        }}
        ref={refScrollView}
        onScroll={() => (hasScrolled.current = true)}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={20}
        ListHeaderComponent={() => {
          return (
            <>
              {renderHeaderComponent()}
              <ItemAction
                questionId={detail?.id}
                like={detail?.likes ?? []}
                onCommentPress={onCommentPress}
                comment={listCommentFilter?.length ?? 0}
              />
            </>
          )
        }}
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
        onContentSizeChange={() => {
          // refScrollView.current?.scrollToEnd({ animated: true })
        }}
        ListFooterComponent={() => {
          if (isLoading) return <ActivityIndicator />
          return null
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ backgroundColor: colors.white,paddingBottom:HEIGHT(80) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
