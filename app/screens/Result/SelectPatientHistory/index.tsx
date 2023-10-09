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
import useHookSelectPatient from "./useHookSelectPatient"
import ItemPlaceholderCommon from "@app/components/placeholder/ItemCalendar"
interface IScreenProps {
  route: {
    params: {
      preScreen?: string
    }
  }
}
export default function SelectPatientHistory({ route }: IScreenProps) {
  const patients = useSelector((state) => state.patientReducers.patients)
  const { loading, getAllPatient, listPatients } = useHookSelectPatient()
  const dispatch = useDispatch()
  useEffect(() => {
    getAllPatient()
  }, [])

  if (loading)
    return (
      <View style={styles.container}>
        <Header
          leftIcon="arrow_left"
          title="Chọn hồ sơ bệnh nhân"
          backgroundColor={colors.gray_1}
        />
        <ItemPlaceholderCommon />
        <ItemPlaceholderCommon />
        <ItemPlaceholderCommon />
      </View>
    )
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn hồ sơ bệnh nhân" backgroundColor={colors.gray_1} />
      <FlatList
        data={listPatients}
        renderItem={({ item, index }) => {
          return (
            <ItemRecord
              item={item}
              onPress={() => {
                navigate("ExaminationHistory", { id: item?.id })
              }}
            />
          )
        }}
        ListFooterComponent={() => <View style={{ height: HEIGHT(100) }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
