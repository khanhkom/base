import { StyleSheet, View } from "react-native"
import React from "react"
import { KEYSTORAGE, remove } from "@app/utils/storage"
import { removeUserData } from "@app/redux/actions"
import { navigate } from "@app/navigators/navigationUtilities"
import { api } from "@app/services/api"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useDispatch } from "react-redux"
import { Header } from "@app/components/Header"
import BaseInfor from "./Item/BaseInfor"
import { List } from "react-native-paper"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"

export default function Account() {
  const dispatch = useDispatch()
  const onLogout = async () => {
    await remove(KEYSTORAGE.LOGIN_DATA)
    dispatch(removeUserData())
    navigate("Login")
    api.apisauce.setHeader("access-token", "")
    await GoogleSignin.signOut()
  }
  return (
    <View style={styles.container}>
      <Header title="Thông tin tài khoản" leftIcon="arrow_left" rightIcon="edit_2" />
      <BaseInfor />
      <List.Item
        style={styles.buttonLogout}
        onPress={onLogout}
        title={() => {
          return (
            <Text size="ba" weight="normal">
              Đăng xuất
            </Text>
          )
        }}
        left={() => {
          return <Icon icon="ic_logout" size={WIDTH(24)} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
  buttonLogout: {
    position: "absolute",
    bottom: HEIGHT(spacing.md),
    backgroundColor: colors.white,
    left: WIDTH(spacing.md),
    width: WIDTH(343),
    borderRadius: WIDTH(12),
    paddingLeft: WIDTH(16),
  },
})
