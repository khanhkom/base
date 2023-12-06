import { KeyboardAvoidingView, StyleSheet, View, Image, Platform, Pressable } from "react-native"
import React, { useEffect, useRef, useState } from "react"
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
import { EToastType, showToastMessage } from "@app/utils/library"
import { getMyProfile } from "@app/redux/actions"
import { updateFullName, updateImagePatient } from "@app/services/api/functions/users"
import { useDispatch } from "react-redux"
import ModalImagePicker from "@app/components/image-picker"
export default function UpdateAccount() {
  const user = useSelector((state) => state.userReducers.user)
  console.log("nameRedux", user)
  const [name, setText] = React.useState(user?.fullname || "")
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const refSelect = useRef(null)
  const dispatch = useDispatch()
  const onPickFile = () => {
    refSelect.current.show()
  }
  useEffect(() => {
    if (user?.avatarUrl) {
      setAvatar({ uri: user?.avatarUrl, isOld: true })
    }
  }, [user])
  console.log("avatar_avatar", avatar)
  const onPressSave = async () => {
    setLoading(true)
    const resUpdate = await updateFullName({ fullname: name })
    if (avatar?.uri && !avatar?.isOld) {
      const formData = new FormData()
      const bodyImage = {
        name: avatar.fileName || avatar.uri,
        type: avatar.type,
        uri: Platform.OS === "ios" ? avatar.uri.replace("file://", "") : avatar.uri,
      }
      formData.append("file", bodyImage)
      const updateImage = await updateImagePatient(formData, user?.id)
      console.log("updateImage_updateImage::", updateImage)
    }
    console.log("resUpdate_resUpdate", resUpdate?.data)
    if (resUpdate?.status === 200) {
      showToastMessage("Cập nhật thành công!", EToastType.SUCCESS)
      dispatch(getMyProfile())
      goBack()
    } else {
      showToastMessage("Cập nhật thất bại, Vui lòng thử lại!", EToastType.ERROR)
    }
    setLoading(false)
  }

  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header leftIcon="arrow_left" title={"Cập nhật thông tin"} backgroundColor={colors.white} />
      <View style={{ flex: 1 }}>
        <Pressable onPress={onPickFile} style={styles.wrapperImage}>
          <Image
            source={avatar?.uri ? { uri: avatar?.uri } : R.images.avatar_patient}
            style={styles.doctorImage}
            resizeMode="cover"
          />
          <View style={styles.buttonImage}>
            <Icon icon="camera" size={WIDTH(24)} />
          </View>
        </Pressable>
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
          loading={loading}
          onPress={onPressSave}
        >
          {translate("common.save")}
        </Button>
      </KeyboardAvoidingView>
      <ModalImagePicker
        ref={refSelect}
        turnOffModal={() => {}}
        onResult={(assets) => {
          // setImage(asset);
          setAvatar(assets[0])
        }}
      />
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
  wrapperImage: {
    alignSelf: "center",
    marginBottom: HEIGHT(spacing.xl),
  },
})
