import React from "react"
export const ActionFromCallKit = {
  NONE: "NONE",
  ANSWER: "ANSWER",
  REJECT: "REJECT",
  ON_NOTI: "ON_NOTI",
}

export const PreferencesContext = React.createContext({
  toggleTheme: (value: boolean) => {
    console.log(value)
  },
  setDefaultSystem: (value: boolean) => {
    console.log(value)
  },
  isThemeDark: false,
  isDefaultSystem: false,
  sourceColor: "#006A6A",
  setSourceColorM3: (value: string) => {
    console.log(value)
  },
})
