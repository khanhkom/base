import URL from "@app/services/api/url"
import { api } from "../api"
export const createStringeeSession = () =>
  api.apisauce
    .post(URL.CREATE_SESSION_STRINGEE)
    .then((res) => res)
    .catch((err) => err)
export const getNameById = (userId) =>
  fetch(`https://api.sdoctor.vn/api/san-review/authentication/${userId}/fullname`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data
      // Do something with the response data here
    })
    .catch((error) => {
      console.error("Error:", error)
      // Handle any errors that occurred during the request
    })
