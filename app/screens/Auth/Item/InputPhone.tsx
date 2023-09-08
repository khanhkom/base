import { StyleSheet, Keyboard, View, Pressable, TextInput } from "react-native"
import React, { useRef, useState, useEffect } from "react"
import PhoneInput from "react-native-phone-number-input"
import { CountryPicker, CountryButton } from "react-native-country-codes-picker"
import { Button } from "react-native-paper"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { TextPaper } from "@app/components/text-paper"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
interface ItemProps {
  setPhoneNumber: (val: string) => void
  phoneNumber: string
  setCountryCode: (val: string) => void
}
export default function InputPhone({ setPhoneNumber, phoneNumber, setCountryCode }: ItemProps) {
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
  return (
    <>
      <View style={[styles.wrapperInput, focus && { borderColor: colors.primary }]}>
        <Pressable style={styles.buttonCode} onPress={() => setShow((val) => !val)}>
          <TextPaper style={{ marginRight: WIDTH(spacing.xxs) }}>+84</TextPaper>
          <Icon icon="arrow_down" size={16} />
        </Pressable>
        <View style={styles.lineVer} />
        <TextInput
          placeholder="Nhập số điện thoại"
          style={styles.textInput}
          keyboardType="numeric"
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
          phoneNumber={phoneNumber}
          onChangeText={(val) => setPhoneNumber(val)}
        />
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
        searchMessage={"Some search message here"}
        ListHeaderComponent={({ countries }) => {
          return (
            <View>
              {countries.map((item, index) => {
                return (
                  <CountryButton
                    item={item}
                    key={index}
                    name={item.name["en"]}
                    onPress={() => {
                      setCountryCode(item.dial_code)
                      setShow(false)
                    }}
                  />
                )
              })}
            </View>
          )
        }}
        popularCountries={["VN", "EN"]}
        style={{
          // Styles for whole modal [View]
          modal: {
            height: isKeyboardVisible ? HEIGHT(500) : HEIGHT(800),
            paddingTop: 32,
            backgroundColor: R.colors.white,
          },
        }}
      />
      {/* <Text preset="smRegular" style={{ marginTop: HEIGHT(spacing.xs), color: colors.red_5 }}>
        Vui lòng kiểm tra lại số điện thoại!
      </Text> */}
    </>
  )
}

const styles = StyleSheet.create({
  wrapperInput: {
    width: WIDTH(343),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray_3,
    paddingVertical: HEIGHT(spacing.sm),
    marginTop: HEIGHT(spacing.md),
    flexDirection: "row",
    alignItems: "center",
  },
  buttonCode: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: WIDTH(spacing.sm),
    paddingRight: WIDTH(spacing.xs),
  },
  lineVer: {
    backgroundColor: colors.gray_3,
    height: HEIGHT(24),
    width: 1,
  },
  textInput: {
    padding: 0,
    margin: 0,
    marginLeft: WIDTH(spacing.xs),
  },
})
