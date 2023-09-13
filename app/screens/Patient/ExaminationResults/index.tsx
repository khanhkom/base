import { StyleSheet, View, Image, FlatList } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import R from "@app/assets"
import { spacing } from "@app/theme/spacing"
import { Button } from "react-native-paper"
import ItemRecord from "@app/screens/Booking/MakeBooking/SelectPatientRecord/Item/ItemRecord"
import { navigate } from "@app/navigators/navigationUtilities"

export default function ExaminationResults() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Kết quả khám" backgroundColor={colors.gray_1} />
      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item, index }) => {
          return (
            <ItemRecord
              onPress={() => {
                navigate("ExaminationHistory")
              }}
            />
          )
        }}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />
      <View style={styles.bottomButton}>
        <Button style={styles.button} buttonColor={colors.primary_8} mode="contained">
          Gửi đánh giá
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },

  bottomButton: {
    position: "absolute",
    bottom: 0,
    paddingVertical: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.md),
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  button: {
    borderRadius: 8,
    flex: 1,
  },
})
