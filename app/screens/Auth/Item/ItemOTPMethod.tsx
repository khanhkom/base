import { StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Toggle } from "@app/components/Toggle"
interface ItemProps {
  setOTPMethod: (val: number) => void
  otpMethod: number
}
export default function ItemOTPMethod({ otpMethod, setOTPMethod }: ItemProps) {
  return (
    <View>
      <Text
        size="ba"
        weight="medium"
        style={{ marginVertical: HEIGHT(spacing.sm), color: colors.gray_7 }}
      >
        Gửi mã xác minh OTP tới:
      </Text>
      <View style={styles.wrapperToggle}>
        <Toggle
          containerStyle={styles.flexRow}
          label="Tin nhắn Zalo"
          variant="checkbox"
          value={otpMethod === 0}
          onPress={() => setOTPMethod(0)}
        />
        <Toggle
          containerStyle={styles.flexRow}
          label="SMS OTP"
          variant="checkbox"
          value={otpMethod === 1}
          onPress={() => setOTPMethod(1)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    width: WIDTH(140),
  },
  wrapperToggle: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH(343),
  },
})
