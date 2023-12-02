import URL from "@app/services/api/url"
import { api } from "../api"
import { ApiResponse } from "apisauce"
import { IQuestion, ISpecialistMost, UpdateComment } from "@app/interface/question"

export const createQuestion = (question) =>
  api.apisauce
    .post(URL.CREATE_QUESTION, question)
    .then((res) => res)
    .catch((err) => err)

export const getMyQuestion = (params): Promise<ApiResponse<IQuestion[]>> =>
  api.apisauce
    .get(URL.GET_QUESTION, params)
    .then((res) => res)
    .catch((err) => err)

export const getDeatilQuestion = (id: string): Promise<ApiResponse<IQuestion>> =>
  api.apisauce
    .get(URL.GET_QUESTION_BY_ID + id)
    .then((res) => res)
    .catch((err) => err)
export const getQuestionFilter = (params): Promise<ApiResponse<{ items: IQuestion[] }>> =>
  api.apisauce
    .get(URL.GET_QUESTION, params)
    .then((res) => res)
    .catch((err) => err)

export const createCommentQuestion = (
  id: string,
  body: UpdateComment,
): Promise<ApiResponse<IQuestion>> =>
  api.apisauce
    .post(`${URL.CREATE_COMMENT}${id}/comment`, body)
    .then((res) => res)
    .catch((err) => err)

export const deleteCommentQuestion = (
  questionId: string,
  commentId: string,
): Promise<ApiResponse<IQuestion>> =>
  api.apisauce
    .delete(`${URL.DELETE_COMMENT}${questionId}/comment/${commentId}`)
    .then((res) => res)
    .catch((err) => err)
export const getListQuestionSpecialList = (): Promise<ApiResponse<ISpecialistMost[]>> =>
  api.apisauce
    .get(URL.MOST_SPECIAL_LIST_QUESTION)
    .then((res) => res)
    .catch((err) => err)

export const toggedLikeQuestion = (questionId: string): Promise<ApiResponse<{ likes: string[] }>> =>
  api.apisauce
    .patch(`${URL.LIKE_QUESTION}${questionId}/likeToggle`)
    .then((res) => res)
    .catch((err) => err)

export const toggedLikeComment = (
  questionId: string,
  commentId: string,
): Promise<ApiResponse<{ likes: string[] }>> =>
  api.apisauce
    .patch(`${URL.LIKE_QUESTION}${questionId}/likeToggle/${commentId}`)
    .then((res) => res)
    .catch((err) => err)
