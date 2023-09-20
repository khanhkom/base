import { combineReducers } from "redux"
import userReducers from "./userReducers"
import appReducers from "./appReducers"
import stringeeReducers from "./stringeeReducers"
import bookingHistoryReducers from "./bookingHistoryReducers"
import orderReducers from "./orderReducers"
import patientReducers from "./patientReducers"
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux"
const rootReducers = combineReducers({
  userReducers,
  appReducers,
  stringeeReducers,
  bookingHistoryReducers,
  orderReducers,
  patientReducers,
})

export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducers>> = useReduxSelector
export default rootReducers
