import { getAllResults } from "@app/services/api/functions/result"
import { EToastType, showToastMessage } from "@app/utils/library"
import { useState } from "react"

const useHookExam = () => {
  const [loading, setLoading] = useState(true)
  const [listResults, setListResults] = useState([])

  const getAllResulsCall = async () => {
    const params = {
      page: 1,
      perPage: 20,
    }
    setLoading(true)
    const resResults = await getAllResults(params)
    if (resResults.status === 200) {
      setListResults(resResults?.data)
    } else {
      showToastMessage("Có lỗi xảy ra! Vui lòng thử lại!", EToastType.ERROR)
    }
    setLoading(false)
  }
  return { loading, getAllResulsCall, listResults }
}
export default useHookExam
