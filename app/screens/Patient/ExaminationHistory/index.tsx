import { StyleSheet, View, Image, FlatList } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import R from "@app/assets"
import { spacing } from "@app/theme/spacing"
import { Button } from "react-native-paper"
import ItemRecord from "@app/screens/Booking/MakeBooking/SelectPatientRecord/Item/ItemRecord"
import ItemHistory from "./Item/ItemHistory"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemEmpty from "./Item/ItemEmpty"

export default function ExaminationHistory() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Lịch sử khám" backgroundColor={colors.gray_1} />
      {/* <ItemEmpty /> */}
      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item, index }) => {
          return (
            <ItemHistory
              index={index}
              onPress={() => {
                navigate("DetailExamination")
              }}
            />
          )
        }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
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
