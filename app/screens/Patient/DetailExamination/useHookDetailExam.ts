import { IOrder, IOrderHistory } from "@app/interface/order"
import { IOrderResult } from "@app/interface/result"
import { getDetailResultByOrder } from "@app/services/api/functions/result"
import { useEffect, useState } from "react"
import moment from "moment"
export const TYPE_INFO_RESULT = {
  MA_PHIEU: 0,
  BAC_SI: 1,
  CHUYEN_KHOA: 2,
  NGAY_KHAM: 3,
  GIO_KHAM: 4,
}
const useHookDetailExam = (id) => {
  const [loading, setLoading] = useState(true)
  const [detailResult, setDetailResult] = useState<{ result: IOrderResult; order: IOrderHistory }>()
  const getDetailOrderApi = async () => {
    setLoading(true)
    let resOrder = await getDetailResultByOrder(id)
    console.log("resOrder::", resOrder?.data)
    setDetailResult(resOrder.data)
    setLoading(false)
  }
  const returnDataByField = (field) => {
    if (!detailResult?.result) return ""
    switch (field) {
      case TYPE_INFO_RESULT.MA_PHIEU:
        return detailResult?.order?.code
      case TYPE_INFO_RESULT.BAC_SI:
        return detailResult?.order?.doctor?.name
      case TYPE_INFO_RESULT.CHUYEN_KHOA:
        // return specialistName
        return detailResult?.order?.patientNotes

      case TYPE_INFO_RESULT.NGAY_KHAM:
        return moment(detailResult?.order?.timeRange?.from).format("DD/MM/YYYY")
      case TYPE_INFO_RESULT.GIO_KHAM:
        return `${moment(detailResult?.order?.timeRange?.from).format("HH:mm")} - ${moment(
          detailResult?.order?.timeRange?.to,
        ).format("HH:mm")}`
      default:
        break
    }
  }
  useEffect(() => {
    getDetailOrderApi()
  }, [])
  return { loading, detailResult, returnDataByField }
}
export default useHookDetailExam
