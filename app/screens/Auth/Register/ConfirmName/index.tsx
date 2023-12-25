import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import { Button, TextInput } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { getMyProfile, updateUserField } from "@app/redux/actions"
import { useDispatch } from "react-redux"
import { translate } from "@app/i18n/translate"
import { updateFullName } from "@app/services/api/functions/users"
import { EToastType, showToastMessage } from "@app/utils/library"
import { Screen } from "@app/components/Screen"

export default function ConfirmName() {
  // const [name, setText] = React.useState(nameRedux || "")
  const [name, setText] = React.useState("")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onPressSave = async () => {
    setLoading(true)
    const resUpdate = await updateFullName({ fullname: name })

    console.log("resUpdate_resUpdate", resUpdate?.data)
    if (resUpdate?.status === 200) {
      showToastMessage("Cập nhật thành công!", EToastType.SUCCESS)
      dispatch(getMyProfile())
      navigate("CreatePatient", {
        name,
        fromRegister: true,
      })
      dispatch(
        updateUserField({
          name,
        }),
      )
    } else {
      showToastMessage("Cập nhật thất bại, Vui lòng thử lại!", EToastType.ERROR)
    }
    setLoading(false)
  }

  return (
    <Screen
      preset="auto"
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header title={translate("auth.name_confirmation")} backgroundColor={colors.white} />
      <View style={{ flex: 1 }}>
        <TextInput
          placeholderTextColor={colors.gray_5}
          placeholder={translate("auth.enter_full_name")}
          mode="outlined"
          value={name}
          style={{
            marginHorizontal: WIDTH(spacing.md),
            marginTop: HEIGHT(spacing.lg),
          }}
          autoFocus
          outlineStyle={styles.outlineStyle}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <KeyboardAvoidingView behavior="padding">
        <Button
          mode="contained"
          disabled={name === ""}
          style={styles.button}
          onPress={onPressSave}
          loading={loading}
        >
          {translate("common.continue")}
        </Button>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginBottom: HEIGHT(spacing.md),
    marginLeft: WIDTH(spacing.md),
    width: WIDTH(343),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  outlineStyle: { borderColor: colors.main_6, borderRadius: 8 },
})
