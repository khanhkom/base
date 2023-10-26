import { StyleSheet, Keyboard, View, Pressable, TextInput } from "react-native"
import React, { useState, useEffect } from "react"
import { CountryPicker, CountryButton } from "react-native-country-codes-picker"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import { translate } from "@app/i18n/translate"
interface ItemProps {
  setPhoneNumber: (val: string) => void
  phoneNumber: string
  setCountryCode: (val: string) => void
  countryCode: string
  error: boolean
}
export default function InputPhone({
  setPhoneNumber,
  phoneNumber,
  setCountryCode,
  countryCode,
  error,
}: ItemProps) {
  const [show, setShow] = useState(false)
  const [focus, setFocus] = useState(false)
  // const [countryCode, setCountryCode] = useState("")
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true) // or some other action
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false) // or some other action
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])
  const firstString = phoneNumber?.[0] ?? ""
  // alow paste many string after that convert to number
  const inputLimit = phoneNumber.length <= 8 ? 100 : firstString === "0" ? 10 : 9
  return (
    <>
      <View style={[styles.containerInput, focus && { borderColor: colors.primary_0 }]}>
        <View
          style={[
            styles.wrapperInput,
            focus && { borderColor: colors.primary_6 },
            error && { borderColor: colors.red_5 },
          ]}
        >
          <Pressable style={styles.buttonCode} onPress={() => setShow((val) => !val)}>
            <Text
              size="md"
              weight="normal"
              style={{ marginRight: WIDTH(spacing.xxs), color: colors.gray_9 }}
            >
              {countryCode}
            </Text>
            <Icon icon="arrow_down" size={16} color={colors.gray_9} />
          </Pressable>
          <View style={styles.lineVer} />
          <TextInput
            placeholder={translate("auth.enter_your_phone_number")}
            style={styles.textInput}
            keyboardType="numeric"
            onFocus={() => {
              setFocus(true)
            }}
            placeholderTextColor={colors.gray_6}
            onBlur={() => {
              setFocus(false)
            }}
            value={phoneNumber}
            maxLength={inputLimit}
            onChangeText={(val) => setPhoneNumber(val)}
          />
        </View>
      </View>
      <CountryPicker
        show={show}
        inputPlaceholder="Nhập tên nước"
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code)
          setShow(false)
        }}
        onRequestClose={() => {
          setShow(false)
        }}
        disableBackdrop
        ListHeaderComponent={({ countries }) => {
          return (
            <View>
              {countries.map((item, index) => {
                return (
                  <CountryButton
                    item={item}
                    key={index}
                    name={item.name.en}
                    onPress={() => {
                      setCountryCode(item.dial_code)
                      setShow(false)
                    }}
                    style={{
                      flag: {
                        color: colors.white,
                      },
                      dialCode: {
                        color: colors.gray_9,
                      },
                      countryName: {
                        color: colors.gray_9,
                      },
                    }}
                  />
                )
              })}
            </View>
          )
        }}
        inputPlaceholderTextColor={colors.gray_6}
        popularCountries={["VN", "EN"]}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: isKeyboardVisible ? HEIGHT(500) : HEIGHT(750),
            paddingTop: 32,
            backgroundColor: R.colors.white,
          },
          flag: {
            color: colors.white,
          },
          dialCode: {
            color: colors.gray_9,
          },
          countryName: {
            color: colors.gray_9,
          },
        }}
      />
      {error && (
        <Text preset="smRegular" style={{ marginTop: HEIGHT(spacing.xs), color: colors.red_5 }}>
          {translate("auth.verify_telephone_number_again")}
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  buttonCode: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: WIDTH(spacing.sm),
    paddingRight: WIDTH(spacing.xs),
  },
  containerInput: {
    borderColor: colors.white,
    borderRadius: 12,
    borderWidth: 4,
    marginTop: HEIGHT(spacing.md),
    width: WIDTH(343),
  },
  lineVer: {
    backgroundColor: colors.gray_3,
    height: HEIGHT(24),
    width: 1,
  },
  textInput: {
    margin: 0,
    marginLeft: WIDTH(spacing.xs),
    padding: 0,
  },
  wrapperInput: {
    alignItems: "center",
    borderColor: colors.gray_3,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: HEIGHT(spacing.sm),
  },
})
