import { KeyboardAvoidingView, StyleSheet, View, Image, Platform } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import { Button, TextInput } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { goBack } from "@app/navigators/navigationUtilities"
import { useSelector } from "@app/redux/reducers"
import { translate } from "@app/i18n/translate"
import { Text } from "@app/components/Text"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import { Screen } from "@app/components/Screen"
export default function UpdateAccount() {
  const nameRedux = useSelector((state) => state.userReducers.user?.name)
  const [name, setText] = React.useState(nameRedux || "")
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header leftIcon="arrow_left" title={"Cập nhật thông tin"} backgroundColor={colors.white} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignSelf: "center",

            marginBottom: HEIGHT(spacing.xl),
          }}
        >
          <Image source={R.images.avatar_docter} style={styles.doctorImage} resizeMode="cover" />
          <View style={styles.buttonImage}>
            <Icon icon="camera" size={WIDTH(24)} />
          </View>
        </View>
        <Text
          size="ba"
          weight="medium"
          style={{ color: colors.gray_7, marginLeft: WIDTH(spacing.md) }}
        >
          Họ và tên<Text style={{ color: colors.red_5 }}> *</Text>
        </Text>
        <TextInput
          placeholderTextColor={colors.gray_5}
          placeholder={translate("auth.enter_full_name")}
          mode="outlined"
          // label="Nhập họ và tên"
          value={name}
          style={{
            marginHorizontal: WIDTH(spacing.md),
            marginTop: HEIGHT(spacing.xs),
            backgroundColor: colors.white,
          }}
          outlineStyle={styles.outlineStyle}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <KeyboardAvoidingView behavior="padding">
        <Button
          mode="contained"
          disabled={name === ""}
          style={styles.button}
          onPress={() => {
            goBack()
          }}
        >
          {translate("common.save")}
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
  outlineStyle: { borderColor: colors.gray_3, borderRadius: 8 },
  doctorImage: {
    height: WIDTH(264),
    width: WIDTH(196),
    borderRadius: 12,
  },
  buttonImage: {
    height: WIDTH(40),
    width: WIDTH(40),
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.backdrop,
  },
})
