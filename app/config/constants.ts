import colors from "@app/assets/colors"
import { STATUS_ORDER } from "@app/interface/order"

export const LIST_ICON_BY_STATUS = [
  {
    title: "Đã đặt khám",
    icon: "ic_status_booked",
    color: colors.primary,
    backgroundColor: colors.blue_0,
    status: STATUS_ORDER.created,
  },
  {
    title: "Sẵn sàng khám",
    icon: "ic_status_booked",
    color: colors.primary,
    backgroundColor: colors.blue_0,
    status: STATUS_ORDER.verified,
  },
  {
    title: "Đã khám",
    icon: "tick_circle",
    color: colors.green_7,
    backgroundColor: colors.green_0,
    status: STATUS_ORDER.done,
  },
  {
    title: "Đã hủy",
    icon: "refresh",
    color: colors.red_5,
    backgroundColor: colors.red_0,
    status: STATUS_ORDER.cancel,
  },
]
