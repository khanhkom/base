import { StyleSheet, Image, View, FlatList } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header, Icon } from "@app/components/index"
import BottonButton from "./Item/BottonButton"
import ItemRecord from "./Item/ItemRecord"

export default function SelectPatientRecord() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn hồ sơ bệnh nhân" />

      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item, index }) => {
          return <ItemRecord />
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
