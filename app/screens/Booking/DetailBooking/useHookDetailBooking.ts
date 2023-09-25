import { LIST_ICON_BY_STATUS } from "@app/config/constants"
import { IOrderHistory } from "@app/interface/order"
import {
  updateDocterCreateOrder,
  updatePatientOrder,
  updateSelectedTimeOrder,
  updateSeletedDateOrder,
  updateSpecialListOrder,
} from "@app/redux/actions/actionOrder"
import { getDetailOrder } from "@app/services/api/functions/order"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { DATA_TIME } from "../MakeBooking/SelectTimeBooking/Data"
export const TYPE_FIELD = {
  status: 0,
  date: 1,
  time: 2,
  patientId: 3,
  patientName: 4,
  docterName: 5,
  specialList: 6,
  patientNotes: 7,
}
export const DATA_BOOK = [
  {
    icon: "calendar",
    title: "Thông tin lịch khám",
    data: [
      {
        title: "Trạng thái: ",
        type: TYPE_FIELD.status,
      },
      {
        title: "Ngày khám: ",
        type: TYPE_FIELD.date,
      },
      {
        title: "Giờ khám: ",
        type: TYPE_FIELD.time,
      },
    ],
  },
  {
    icon: "personalcard",
    title: "Thông tin bệnh nhân",
    data: [
      {
        title: "Mã bệnh nhân: ",
        type: TYPE_FIELD.patientId,
      },
      {
        title: "Họ tên: ",
        type: TYPE_FIELD.patientName,
      },
    ],
  },
  {
    icon: "note",
    title: "Thông tin đăng ký khám",
    data: [
      {
        title: "Bác sĩ: ",
        type: TYPE_FIELD.docterName,
      },
      {
        title: "Chuyên khoa: ",
        type: TYPE_FIELD.specialList,
      },
    ],
  },
  {
    icon: "ask",
    title: "Lý do khám:",
    data: [
      {
        title: "",
        type: TYPE_FIELD.patientNotes,
      },
    ],
  },
]
const useHookDetailBooking = (id) => {
  const [loading, setLoading] = useState(true)
  const [detailOrder, setDetailOrder] = useState<IOrderHistory>()
  const getDetailOrderApi = async () => {
    setLoading(true)
    let resOrder = await getDetailOrder(id)
    console.log("AAAAAAAAAA", resOrder?.data)
    setDetailOrder(resOrder.data)
    setLoading(false)
  }
  const dispatch = useDispatch()
  const updateDataCreateOrder = () => {
    let timeFrom = moment(detailOrder?.timeRange?.from).format("HH:mm")
    DATA_TIME.map((item, index) => {
      let itemStamp = item.data.find((it) => it.from === timeFrom)
      if (itemStamp?.from) {
        dispatch(updateSelectedTimeOrder(itemStamp))
      }
    })
    dispatch(updateSeletedDateOrder(moment(detailOrder?.timeRange?.from).format("YYYY-MM-DD")))
    dispatch(updatePatientOrder(detailOrder?.patient))
    dispatch(
      updateSpecialListOrder({
        name: detailOrder?.specialist?.value,
        code: detailOrder?.specialist?.specialistCode,
      }),
    )
    dispatch(updateDocterCreateOrder(detailOrder?.doctor))
  }
  const returnDataByField = (field) => {
    if (!detailOrder?.id) return ""
    switch (field) {
      case TYPE_FIELD.status:
        return LIST_ICON_BY_STATUS.find((it) => it.status === detailOrder?.status)?.title
      case TYPE_FIELD.date:
        return moment(detailOrder?.timeRange?.from).format("DD/MM/YYYY")
      case TYPE_FIELD.time:
        return `${moment(detailOrder?.timeRange?.from).format("HH:mm")} - ${moment(
          detailOrder?.timeRange?.to,
        ).format("HH:mm")}`
      case TYPE_FIELD.patientId:
        return detailOrder?.patient?.id
      case TYPE_FIELD.patientName:
        return detailOrder?.patient?.name
      case TYPE_FIELD.docterName:
        return detailOrder?.doctor?.name
      case TYPE_FIELD.specialList:
        return detailOrder?.specialist?.value
      case TYPE_FIELD.patientNotes:
        return detailOrder?.patientNotes
      default:
        break
    }
  }
  useEffect(() => {
    getDetailOrderApi()
  }, [])
  return { loading, detailOrder, returnDataByField, getDetailOrderApi, updateDataCreateOrder }
}
export default useHookDetailBooking
