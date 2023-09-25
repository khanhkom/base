import { ISpecialList } from "@app/interface/docter"

const defaultState: IState = {
  listSpecialList: [],
  loading: false,
}
interface IState {
  listSpecialList: ISpecialList[]
  loading: boolean
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_SPECIAL_LIST_REQUEST": {
      return {
        ...state,
        loading: true,
      }
    }
    case "FETCH_SPECIAL_LIST_FAIL": {
      return {
        ...state,
        loading: false,
      }
    }
    case "FETCH_SPECIAL_LIST_SUCCESS": {
      return {
        ...state,
        listSpecialList: action.data,
        loading: false,
      }
    }
    default:
      break
  }
  return state
}
