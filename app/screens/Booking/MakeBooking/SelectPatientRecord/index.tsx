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
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { HEIGHT } from "@app/config/functions"
interface IScreenProps {
  route: {
    params: {
      preScreen?: string
    }
  }
}
export default function SelectPatientRecord({ route }: IScreenProps) {
  const patients = useSelector((state) => state.patientReducers.patients)
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
                dispatch(updatePatientOrder(item))
                if (route?.params?.preScreen) {
                  goBack()
                } else {
                  navigate("SelectSpecialist")
                }
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
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
