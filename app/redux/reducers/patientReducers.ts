import { IPatient } from "@app/interface/patient"
const defaultState: IState = {
  patients: [],
  loading: false,
}
interface IState {
  patients: IPatient[]
  loading: boolean
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_LIST_PATIENT_REQUEST": {
      return {
        ...state,
        loading: true,
      }
    }
    case "FETCH_LIST_PATIENT_SUCCESS": {
      return {
        ...state,
        patients: action.data,
        loading: false,
      }
    }
    case "FETCH_LIST_PATIENT_FAIL": {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      break
  }
  return state
}
