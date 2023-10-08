import { ApiResponse } from "apisauce"
import { api } from "../api"
import { IBodyByPage } from "@app/interface/general"
import URL from "../url"
import { Inotification } from "@app/interface/notifications"

export const getListNotification = (
  body: IBodyByPage,
): Promise<ApiResponse<{ items: Inotification[] }>> =>
  api.apisauce
    .get(URL.GET_NOTIFICATION, body)
    .then((res) => res)
    .catch((err) => err)
