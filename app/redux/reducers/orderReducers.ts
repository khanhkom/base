import { IDocter } from "@app/interface/docter"
import { IOrder } from "./../../interface/order"
import moment from "moment"
import { STATUS_DOCTER } from "@app/screens/Booking/MakeBooking/SelectTimeBooking/Data"
import { IPatient } from "@app/interface/patient"
const defaultState: IState = {
  orderCreate: {
    patientId: "",
    doctorId: "",
    specialist: "",
    timeRange: {
      from: "",
      to: "",
    },
    patientNotes: "",
  },
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
}
interface IState {
  orderCreate: IOrder
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
    id: string
  }
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "UPDATE_BODY_CREATE_ORDER": {
      return {
        ...state,
        orderCreate: {
          ...state.orderCreate,
          ...action.data,
        },
      }
    }
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
    default:
      break
  }
  return state
}
