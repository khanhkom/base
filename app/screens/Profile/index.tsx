import { StyleSheet, View } from "react-native"
import React, { useEffect } from "react"
import Header from "./Item/Header"
import ListFeatures from "./Item/ListFeatures"
import colors from "@app/assets/colors"
import { useDispatch } from "react-redux"
import { getListPatientRequest } from "@app/redux/actions/patient"

export default function Profile() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListPatientRequest())
  }, [])
  return (
    <View style={styles.container}>
      <Header />
      <ListFeatures />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
