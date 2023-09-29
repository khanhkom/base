import { StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Toggle } from "@app/components/Toggle"
import { translate } from "@app/i18n/translate"
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
        {translate("auth.sending_OTP_code_to")}
      </Text>
      <View style={styles.wrapperToggle}>
        <Toggle
          containerStyle={styles.flexRow}
          label={translate("auth.zalo")}
          variant="checkbox"
          value={otpMethod === 0}
          onPress={() => setOTPMethod(0)}
        />
        <Toggle
          containerStyle={styles.flexRow}
          label={translate("auth.sms")}
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
