import { KeyboardAvoidingView, StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import { Button, TextInput } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { Screen } from "@app/components/Screen"
import { updateUserField } from "@app/redux/actions"
import { useDispatch } from "react-redux"
import { useSelector } from "@app/redux/reducers"

export default function ConfirmName() {
  const nameRedux = useSelector((state) => state.userReducers.user?.name)
  const [name, setText] = React.useState(nameRedux || "")
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Xác nhận họ tên" backgroundColor={colors.white} />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholderTextColor={colors.gray_5}
          placeholder="Nhập họ và tên"
          mode="outlined"
          // label="Nhập họ và tên"
          value={name}
          style={{
            marginHorizontal: WIDTH(spacing.md),
            marginTop: HEIGHT(spacing.lg),
          }}
          autoFocus
          outlineStyle={{ borderRadius: 8, borderColor: colors.main_6 }}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <KeyboardAvoidingView behavior="padding">
        <Button
          mode="contained"
          disabled={name === ""}
          style={styles.button}
          onPress={() => {
            navigate("CreatePatient", {
              name,
              fromRegister: true,
            })
            dispatch(
              updateUserField({
                name,
              }),
            )
          }}
        >
          Tiếp tục
        </Button>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  button: {
    width: WIDTH(343),
    marginBottom: HEIGHT(spacing.md),
    marginLeft: WIDTH(spacing.md),
    borderRadius: 8,
  },
})
