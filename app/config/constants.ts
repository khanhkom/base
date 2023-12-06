import colors from "@app/assets/colors"
import { STATUS_ORDER } from "@app/interface/order"
import R from "@app/assets"

export const LIST_ICON_BY_STATUS = [
  {
    title: "Đã đặt khám",
    icon: "ic_status_booked",
    image: R.images.ic_confirm_status,
    color: colors.primary,
    backgroundColor: colors.blue_0,
    status: STATUS_ORDER.created,
  },
  {
    title: "Sẵn sàng khám",
    icon: "ic_status_booked",
    image: R.images.ic_confirm_status,
    color: colors.primary,
    backgroundColor: colors.blue_0,
    status: STATUS_ORDER.verified,
  },
  {
    title: "Đang khám",
    icon: "ic_status_booked",
    color: colors.white,
    image: R.images.ic_examing,
    backgroundColor: colors.red_5,
    status: STATUS_ORDER.examining,
  },
  {
    title: "Đợi kết quả",
    image: R.images.ic_wating_result,
    icon: "ic_status_booked",
    color: colors.violet_8,
    backgroundColor: colors.violet_0,
    status: STATUS_ORDER.result_processing,
  },
  {
    title: "Đã có kết quả",
    icon: "tick_circle",
    image: R.images.ic_wating_result,
    color: colors.violet_8,
    backgroundColor: colors.violet_0,
    status: STATUS_ORDER.rating_processing,
  },

  {
    title: "Đã khám",
    icon: "tick_circle",
    image: R.images.ic_done_status,
    color: colors.green_7,
    backgroundColor: colors.green_0,
    status: STATUS_ORDER.done,
  },
  {
    title: "Đã hủy",
    icon: "refresh",
    image: R.images.ic_cancel_status,
    color: colors.red_5,
    backgroundColor: colors.red_0,
    status: STATUS_ORDER.cancel,
  },
]

export const MessageToast = {
  apiError: "Có lỗi xảy ra, vui lòng thử lại!",
}

export const STATUS_QUESTION = {
  REJECTED: "Bị từ chối",
  CREATED: "Chờ xác nhận",
  VERIFIED: "Chờ bác sĩ trả lời",
  CANCELLED: "Đã hủy",
}

export const STATUS_QUESTION_KEY = {
  REJECTED: "REJECTED",
  CREATED: "CREATED",
  VERIFIED: "VERIFIED",
  CANCELLED: "CANCELLED",
}
