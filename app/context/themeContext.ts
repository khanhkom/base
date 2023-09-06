import React from "react"

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
