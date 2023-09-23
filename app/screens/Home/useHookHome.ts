import { IOrder, STATUS_ORDER } from "@app/interface/order"
import { useSelector } from "@app/redux/reducers"

const useHookHome = () => {
  const orderHistory = useSelector((state) => state.orderReducers.orderHistory)
  const returnNearestOrder = (): IOrder & {
    timeDifference: number
  } => {
    const currentTimestamp = Date.now()
    const orderFilter = orderHistory?.filter((it) => it.status === STATUS_ORDER.verified)
    const nearestOrder = orderFilter
      .map((order) => {
        const fromTimestamp = new Date(order.timeRange.from).getTime()
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
