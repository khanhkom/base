import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import GeneralInfor from "./Item/GeneralInfor"
import Experience from "./Item/Experience"
import Rating from "./Item/Rating"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
export default function DocterInformation() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Thông tin bác sĩ" backgroundColor={colors.gray_1} />
      <ScrollView>
        <GeneralInfor />
        <Experience />
        <Rating />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            navigate("SelectCalendar")
          }}
        >
          Đặt khám
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
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: getWidth(),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.md),
  },
  button: {
    borderRadius: 8,
  },
})
