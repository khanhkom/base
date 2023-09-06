/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ReactotronConfig from "../ReactotronConfig"
import { applyMiddleware, createStore, Middleware, compose } from "redux"
import rootReducer from "../reducers"

export default function configureStore(
  reactotron: ReturnType<typeof ReactotronConfig.configure> | undefined,
  sagaMiddleware: Middleware,
) {
  ReactotronConfig.configure()
  const maybeEnhancer = reactotron?.createEnhancer?.()
  return createStore(
    rootReducer,
    maybeEnhancer
      ? compose(applyMiddleware(sagaMiddleware), maybeEnhancer)
      : applyMiddleware(sagaMiddleware),
  )
}
