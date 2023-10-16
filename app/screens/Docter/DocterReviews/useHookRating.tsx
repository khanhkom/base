import { useState, useEffect } from "react"
import { getRatingByOrderDoctorId } from "@app/services/api/functions/rating"
import { IRatingDoctorDetail } from "@app/interface/rating"

export function useHookRating(userId) {
  const [listData, setListData] = useState<IRatingDoctorDetail[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  async function getList() {
    const body = {
      page: 1,
      perPage: 100,
      doctorId: userId,
    }

    try {
      const response = await getRatingByOrderDoctorId(body)
      if (response?.data) {
        setLoading(false)
        const data: any = response?.data
        const dataListRes: any = data?.items ?? []
        setListData(dataListRes)
      } else {
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  return {
    listData,
    loading,
  }
}
