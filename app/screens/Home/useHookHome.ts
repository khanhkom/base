import { IOrderHistory, STATUS_ORDER } from "@app/interface/order"
import { useSelector } from "@app/redux/reducers"
import moment from "moment"

const useHookHome = () => {
  const orderHistory = useSelector((state) => state.orderReducers.orderHistory)
  const returnNearestOrder = (): IOrderHistory & {
    timeDifference: number
  } => {
    const currentTimestamp = Date.now()
    const orderFilter = orderHistory?.filter((it) => it.status === STATUS_ORDER.verified)
    const nearestOrder = orderFilter
      .map((order) => {
        const fromTimestamp = new Date(
          moment(order.timeRange.from).add("hour", 7).toISOString(),
        ).getTime()
        const timeDifference = Math.abs(currentTimestamp - fromTimestamp)

        return {
          ...order,
          timeDifference,
        }
      })
      .sort((a, b) => a.timeDifference - b.timeDifference)

    return nearestOrder[0]
  }
  return { returnNearestOrder }
}

export default useHookHome
