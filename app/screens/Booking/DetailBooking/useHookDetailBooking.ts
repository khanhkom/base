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
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { DATA_TIME } from "../MakeBooking/SelectTimeBooking/Data"
import { translate } from "@app/i18n/translate"
export const TYPE_FIELD = {
  status: 0,
  date: 1,
  time: 2,
  patientId: 3,
  patientName: 4,
  docterName: 5,
  specialList: 6,
  patientNotes: 7,
  code: 8,
  patientPhone: 9,
}
export const DATA_BOOK = [
  {
    icon: "calendar",
    title: translate("booking.booking_information"),
    data: [
      {
        title: translate("booking.status"),
        type: TYPE_FIELD.status,
      },
      {
        title: translate("booking.code"),
        type: TYPE_FIELD.code,
      },
      {
        title: translate("booking.date_exam"),
        type: TYPE_FIELD.date,
      },
      {
        title: translate("booking.time_exam"),
        type: TYPE_FIELD.time,
      },
    ],
  },
  {
    icon: "personalcard",
    title: translate("booking.patient_information"),
    data: [
      {
        title: translate("booking.code_patient"),
        type: TYPE_FIELD.patientId,
      },
      {
        title: translate("booking.name"),
        type: TYPE_FIELD.patientName,
      },
      {
        title: "Số điện thoại: ",
        type: TYPE_FIELD.patientPhone,
      },
    ],
  },
  {
    icon: "note",
    title: translate("booking.register_information"),
    data: [
      {
        title: `${translate("booking.doctor")}: `,
        type: TYPE_FIELD.docterName,
      },
      {
        title: `${translate("booking.specialist")}: `,
        type: TYPE_FIELD.specialList,
      },
    ],
  },
  {
    icon: "ask",
    title: `${translate("booking.reason_exam")}:`,
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
    setDetailOrder(resOrder.data)
    setLoading(false)
  }
  console.log("AAAAAAAAAAAAA", detailOrder?.timeRange)
  const dispatch = useDispatch()
  const updateDataCreateOrder = () => {
    // let timeFrom = moment(detailOrder?.timeRange?.from).format("HH:mm")
    // DATA_TIME.map((item, index) => {
    //   let itemStamp = item.data.find((it) => it.from === timeFrom)
    //   if (itemStamp?.from) {
    //     dispatch(updateSelectedTimeOrder(itemStamp))
    //   }
    // })
    const fromTime = new Date(detailOrder?.timeRange?.from).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    const toTime = new Date(detailOrder?.timeRange?.to).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })

    const convertedObj = {
      from: fromTime,
      to: toTime,
      id: detailOrder?.timeRange?.id,
    }
    console.log("convertedObj", convertedObj)
    dispatch(updateSelectedTimeOrder(convertedObj))

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
  console.log("detailOrder::", detailOrder)
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
        return detailOrder?.patient?.code
      case TYPE_FIELD.patientName:
        return detailOrder?.patient?.name
      case TYPE_FIELD.docterName:
        return detailOrder?.doctor?.name
      case TYPE_FIELD.specialList:
        return detailOrder?.specialist?.value
      case TYPE_FIELD.patientNotes:
        return detailOrder?.patientNotes
      case TYPE_FIELD.patientPhone:
        return detailOrder?.patient?.phone
      case TYPE_FIELD.code:
        return detailOrder?.code
      default:
        break
    }
  }
  useEffect(() => {
    if (id) {
      getDetailOrderApi()
    }
  }, [])
  return { loading, detailOrder, returnDataByField, getDetailOrderApi, updateDataCreateOrder }
}
export default useHookDetailBooking
