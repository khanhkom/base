import { ICommentData } from "@app/interface/question"
import { loadCommentQuestionByPage } from "@app/services/api/functions/question"
import React, { useEffect, useRef, useState } from "react"

const groupCommentsWithReplies = (comments) => {
  const groupedComments = []

  comments.forEach((comment) => {
    if (!comment.replyToId && (comment?.replies ?? []).length === 0) {
      // Create a new object for comments without a replyToId
      groupedComments.push({
        // comment: comment.content,
        ...comment,
        replies: [],
      })
    } else if ((comment?.replies ?? []).length > 0) {
      groupedComments.push({
        // comment: comment.content,
        ...comment,
      })
    } else {
      // Find the corresponding comment and add the reply
      const parentComment = groupedComments.find(
        (groupedComment) => groupedComment.id === comment.replyToId,
      )
      if (parentComment) {
        parentComment.replies.push(comment)
      }
    }
  })

  return groupedComments
}

const useHookApiComment = (id: string) => {
  const [comments, setComments] = useState<ICommentData[]>(null)
  const [page, setPage] = useState(1)
  const [totalComment, setTotalComment] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isReached, setReached] = useState(false)
  const refScrollView = useRef(null)

  useEffect(() => {
    if (page === 1) {
      setReached(false)
    }
    loadCommentByPageAPI()
  }, [page])

  const loadCommentByPageAPI = async () => {
    if (!isReached) {
      const body = { page, perPage: 10 }
      setIsLoading(true)
      const resComment = await loadCommentQuestionByPage(id, body)
      console.log("body__:::", body)
      const resCommentItems = resComment?.data?.items ?? []
      //   const isLimitData = resComment?.data?.headers?.["x-next-page"] === 0
      const isLimitData = resCommentItems?.length === 0

      // console.log("AAAAAAAAAAA", resComment)
      setReached(isLimitData)
      if (resCommentItems.length > 0) {
        if (page === 1) {
          const newComment = groupCommentsWithReplies([...resCommentItems])
          setComments(newComment)
          setTotalComment(resComment?.data?.headers?.["x-total-count"])
        } else {
          console.log("comments_length::", comments.length)
          const newComment = groupCommentsWithReplies([...comments, ...resCommentItems])
          setComments([...newComment])
        }
      }
      setIsLoading(false)
    }
  }
  // reload comment when have new comment
  const loadNewComment = async () => {
    console.log("loadNewComment:::")
    const body = { page: 1, perPage: page * 10 }
    setIsLoading(true)
    const resComment = await loadCommentQuestionByPage(id, body)

    const resCommentItems = resComment?.data?.items ?? []
    //   const isLimitData = resComment?.data?.headers?.["x-next-page"] === 0
    const isLimitData = resCommentItems?.length === 0

    // console.log("AAAAAAAAAAA", resComment?.data)
    setReached(isLimitData)
    if (resCommentItems.length > 0) {
      const newComment = groupCommentsWithReplies([...resCommentItems])
      setComments(newComment)
    }
    setIsLoading(false)
    setTimeout(() => {
      refScrollView.current?.scrollToEnd({ animated: true })
    }, 300)
  }
  const loadMore = () => {
    console.log("isReached", isReached)
    if (!isReached) {
      setPage((prevPage) => prevPage + 1)
    }
  }
  return {
    comments,
    isLoading,
    loadMore,
    loadCommentByPageAPI,
    setPage,
    loadNewComment,
    refScrollView,
    totalComment,
  }
}
export default useHookApiComment
