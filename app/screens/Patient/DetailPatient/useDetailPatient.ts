import { useEffect, useState } from "react"
import moment from "moment"
import { IPatient } from "@app/interface/patient"
import { getDetailPatient } from "@app/services/api/functions/patient"
export const TYPE_INFO_PATIENT = {
  NAME: 0,
  PHONE: 1,
  BIRTH_DAY: 2,
  GENDER: 3,
  EMAIL: 4,
  ADRESS: 5,
}
export const DATA_DETAIL_PATIENT = [
  {
    title: "Họ và tên",
    field: TYPE_INFO_PATIENT.NAME,
  },
  {
    title: "Số điện thoại",
    field: TYPE_INFO_PATIENT.PHONE,
  },
  {
    title: "Ngày sinh",
    field: TYPE_INFO_PATIENT.BIRTH_DAY,
  },
  {
    title: "Giới tính",
    field: TYPE_INFO_PATIENT.GENDER,
  },
  {
    title: "Email",
    field: TYPE_INFO_PATIENT.EMAIL,
  },
  {
    title: "Địa chỉ",
    field: TYPE_INFO_PATIENT.ADRESS,
  },
]
const useDetailPatient = (id) => {
  const [loading, setLoading] = useState(true)
  const [detailPatient, setDetailPatient] = useState<IPatient>()
  const getDetailOrderApi = async () => {
    setLoading(true)
    let resOrder = await getDetailPatient(id)
    setDetailPatient(resOrder.data)
    setLoading(false)
  }
  const returnDataByField = (field) => {
    if (!detailPatient?.id) return ""
    switch (field) {
      case TYPE_INFO_PATIENT.NAME:
        return detailPatient?.name
      case TYPE_INFO_PATIENT.PHONE:
        return detailPatient?.phone
      case TYPE_INFO_PATIENT.GENDER:
        return detailPatient?.gender === "male" ? "Nam" : "Nữ"
      case TYPE_INFO_PATIENT.BIRTH_DAY:
        return detailPatient?.birthday
      case TYPE_INFO_PATIENT.EMAIL:
        return detailPatient?.mail
      case TYPE_INFO_PATIENT.ADRESS:
        return detailPatient?.address
      default:
        return ""
    }
  }
  useEffect(() => {
    if (id) {
      getDetailOrderApi()
    }
  }, [])
  return { loading, detailPatient, returnDataByField, getDetailOrderApi }
}
export default useDetailPatient
