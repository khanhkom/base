import { StyleSheet, View, FlatList } from "react-native"
import React, { useEffect } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/index"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import { getListPatientRequest } from "@app/redux/actions/patient"
import { navigate } from "@app/navigators/navigationUtilities"
import { HEIGHT } from "@app/config/functions"
import ItemRecord from "@app/screens/Booking/MakeBooking/SelectPatientRecord/Item/ItemRecord"
import BottonButton from "@app/screens/Booking/MakeBooking/SelectPatientRecord/Item/BottonButton"

export default function PatientProfile() {
  const patients = useSelector((state) => state.patientReducers.patients)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getListPatientRequest())
  }, [])
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Hồ sơ y tế" backgroundColor={colors.gray_1} />
      <FlatList
        data={patients}
        renderItem={({ item, index }) => {
          return (
            <ItemRecord
              item={item}
              onPress={() => {
                navigate("DetailPatient", { id: item?.id })
              }}
            />
          )
        }}
        ListFooterComponent={() => <View style={{ height: HEIGHT(100) }} />}
      />
      <BottonButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
})
