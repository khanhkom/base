import { StyleSheet, Image, View, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import colors from "@app/assets/colors"
import { Header, Icon } from "@app/components/index"
import BottonButton from "./Item/BottonButton"
import ItemRecord from "./Item/ItemRecord"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import { getListPatientRequest } from "@app/redux/actions/patient"
import { updatePatientOrder } from "@app/redux/actions/actionOrder"
import { navigate } from "@app/navigators/navigationUtilities"

export default function SelectPatientRecord() {
  const patients = useSelector((state) => state.patientReducers.patients)
  console.log("patients_patients", patients)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListPatientRequest())
  }, [])
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn hồ sơ bệnh nhân" backgroundColor={colors.gray_1} />
      <FlatList
        data={patients}
        renderItem={({ item, index }) => {
          return (
            <ItemRecord
              item={item}
              onPress={() => {
                navigate("SelectSpecialist")
                dispatch(updatePatientOrder(item))
              }}
            />
          )
        }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />
      <BottonButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
