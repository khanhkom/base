import { IDocter } from "@app/interface/docter"
import { IOrder } from "./../../interface/order"
import moment from "moment"
import { STATUS_DOCTER } from "@app/screens/Booking/MakeBooking/SelectTimeBooking/Data"
import { IPatient } from "@app/interface/patient"
const defaultState: IState = {
  selectedDate: moment(new Date()).format("YYYY-MM-DD"),
  selectedTime: {
    time: "10:00 - 10:15",
    startHour: 10,
    startMin: 0,
    status: STATUS_DOCTER.AVAILABLE,
    id: 0,
  },
  docter: {
    userId: "",
    name: "",
    gender: "",
    birthday: "",
    mail: "",
    price: 0,
    specialist: [],
    experience: [],
    education: [],
    averageRating: 0,
    id: "",
  },
  patient: {
    userId: "",
    name: "",
    gender: "",
    birthday: "",
    mail: "",
    address: "",
    province: "",
    city: "",
    ward: "",
    createdAt: "",
    updatedAt: "",
    id: "",
  },
  specialist: {
    title: "",
    id: "",
  },
  orderHistory: [],
  loading: false,
}
interface IState {
  docter: IDocter
  selectedDate: ""
  selectedTime: {
    time: ""
    startHour: number
    startMin: number
    status: STATUS_DOCTER
    id: number
  }
  patient: IPatient
  specialist: {
    title: string
    code: string
  }
  orderHistory: IOrder[]
  loading: boolean
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_ORDER_DOCTER": {
      return {
        ...state,
        docter: action.data,
      }
    }
    case "UPDATE_ORDER_DATE": {
      return {
        ...state,
        selectedDate: action.data,
      }
    }
    case "UPDATE_ORDER_TIME": {
      return {
        ...state,
        selectedTime: action.data,
      }
    }
    case "UPDATE_ORDER_PATIENT": {
      return {
        ...state,
        patient: action.data,
      }
    }
    case "UPDATE_ORDER_SPECIALIST": {
      return {
        ...state,
        specialist: action.data,
      }
    }
    case "FETCH_ORDER_HISTORY_REQUEST": {
      return {
        ...state,
        loading: true,
      }
    }
    case "FETCH_ORDER_HISTORY_FAIL": {
      return {
        ...state,
        loading: false,
      }
    }
    case "FETCH_ORDER_HISTORY_SUCCESS": {
      return {
        ...state,
        orderHistory: action.data,
        loading: false,
      }
    }

    default:
      break
  }
  return state
}
