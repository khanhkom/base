import { combineReducers } from "redux"
import userReducers from "./userReducers"
import appReducers from "./appReducers"

import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux"
const rootReducers = combineReducers({
  userReducers,
  appReducers,
})

export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducers>> = useReduxSelector
export default rootReducers
