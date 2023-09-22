import { StyleSheet, Image, View, FlatList } from "react-native"
import React, { useState } from "react"
import colors from "@app/assets/colors"
import { Header, Text, TextField, Toggle } from "@app/components/index"
import { Button } from "react-native-paper"
import { goBack } from "@app/navigators/navigationUtilities"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { cancelOrder } from "@app/services/api/functions/order"
import { EToastType, showToastMessage } from "@app/utils/library"
import { useDispatch } from "react-redux"
import { getOrderHistory } from "@app/redux/actions/actionOrder"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"

const LIST_REASON = [
  "Không còn nhu cầu khám bệnh",
  "Thay đổi lịch khám",
  "Thay đổi bác sĩ khám",
  "Đã đi khám bệnh trực tiếp",
  "Lý do khác",
]
interface ScreenProps {
  route: {
    params: {
      id: string
      getDetailOrderApi: () => void
    }
  }
}
export default function CancelBooking({ route }: ScreenProps) {
  const [indexSelected, setIndexSelected] = useState(0)
  const [otherText, setOtherText] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const cancelBooking = async () => {
    if (indexSelected === 4 && otherText === "") {
      showToastMessage("Vui lòng nhập lý do", EToastType.ERROR)
    } else {
      let body = {
        description: LIST_REASON?.[indexSelected] ?? otherText,
      }
      setLoading(true)
      let resCancel = await cancelOrder(route.params.id, body)
      console.log("resCancel_resCancel", resCancel?.data)
      setLoading(false)
      route?.params?.getDetailOrderApi?.()
      goBack()
      dispatch(getOrderHistory())
      showToastMessage("Hủy lịch khám thành công", EToastType.SUCCESS)
    }
  }
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Xác nhận hủy lịch khám" backgroundColor={colors.white} />
      <KeyboardAwareFlatList
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
        removeClippedSubviews={false}
        style={{ paddingHorizontal: WIDTH(spacing.md) }}
        renderItem={({ item, index }) => {
          const isActive = indexSelected === index
          return (
            <>
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
              {indexSelected === 4 && index === 4 && (
                <TextField
                  multiline
                  value={otherText}
                  onChangeText={setOtherText}
                  placeholder="Nhập lý do"
                  containerStyle={{ marginTop: HEIGHT(spacing.lg) }}
                />
              )}
            </>
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
        <Button
          onPress={cancelBooking}
          buttonColor={colors.red_5}
          mode="contained"
          style={styles.button}
          loading={loading}
        >
          Xác nhận hủy
        </Button>
      </View>
      {loading && <LoadingOpacity />}
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
