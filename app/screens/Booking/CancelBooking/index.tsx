import { StyleSheet, Image, View, FlatList } from "react-native"
import React, { useState } from "react"
import colors from "@app/assets/colors"
import { Header, Text, TextField, Toggle } from "@app/components/index"
import { Button } from "react-native-paper"
import { goBack } from "@app/navigators/navigationUtilities"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
const LIST_REASON = [
  "Không còn nhu cầu khám bệnh",
  "Thay đổi lịch khám",
  "Thay đổi bác sĩ khám",
  "Đã đi khám bệnh trực tiếp",
  "Lý do khác",
]
export default function CancelBooking() {
  const [indexSelected, setIndexSelected] = useState(0)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Xác nhận hủy lịch khám" backgroundColor={colors.white} />
      <FlatList
        data={LIST_REASON}
        ListHeaderComponent={() => {
          return (
            <Text
              size="xl"
              weight="semiBold"
              style={{
                color: colors.gray_9,
                marginBottom: HEIGHT(4),
                marginTop: HEIGHT(spacing.sm),
              }}
            >
              Lý do hủy khám
            </Text>
          )
        }}
        style={{ paddingHorizontal: WIDTH(spacing.md) }}
        renderItem={({ item, index }) => {
          const isActive = indexSelected === index
          return (
            <Toggle
              onPress={() => {
                setIndexSelected(index)
              }}
              key={index}
              variant="radio"
              label={item}
              labelStyle={{ fontSize: 16, lineHeight: 24, color: colors.gray_9 }}
              value={isActive}
              containerStyle={{ marginTop: HEIGHT(16) }}
            />
          )
        }}
        ListFooterComponent={() => {
          if (indexSelected === 4)
            return (
              <TextField
                multiline
                placeholder="Nhập lý do"
                containerStyle={{ marginTop: HEIGHT(spacing.lg) }}
              />
            )
        }}
      />
      <View style={styles.bottomButton}>
        <Button
          mode="contained"
          style={styles.buttonHome}
          textColor={colors.primary}
          onPress={goBack}
        >
          Quay lại
        </Button>
        <Button onPress={goBack} buttonColor={colors.red_5} mode="contained" style={styles.button}>
          Xác nhận hủy
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
    flexDirection: "row",
    left: 0,
    right: 0,
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: HEIGHT(spacing.sm),
  },
  buttonHome: {
    flex: 1,
    marginRight: WIDTH(spacing.md),
    borderRadius: 8,
    backgroundColor: colors.primary_0,
  },
  button: {
    flex: 1,
    borderRadius: 8,
  },
})
