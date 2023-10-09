import { EToastType, showToastMessage } from "@app/utils/library"
import { useState } from "react"
import { getListPatient } from "@app/services/api/functions/patient"
import { IPatient } from "@app/interface/patient"

const useHookSelectPatient = () => {
  const [loading, setLoading] = useState(true)
  const [listPatients, setListPatients] = useState<IPatient[]>([])

  const getAllPatient = async () => {
    const params = {
      page: 1,
      perPage: 20,
    }
    setLoading(true)
    const resResults = await getListPatient(params)
    if (resResults.status === 200) {
      setListPatients(resResults?.data?.items ?? [])
    } else {
      showToastMessage("Có lỗi xảy ra! Vui lòng thử lại!", EToastType.ERROR)
    }
    setLoading(false)
  }
  return { loading, getAllPatient, listPatients }
}
export default useHookSelectPatient
