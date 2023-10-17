import { StyleSheet, View, Clipboard } from "react-native"
import React, { useEffect, useState } from "react"
import { Button, IconButton } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
import { useSelector } from "@app/redux/reducers"
import { KEYSTORAGE, remove } from "@app/utils/storage"
import messaging from "@react-native-firebase/messaging"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { EToastType, showToastMessage } from "@app/utils/library"
import { api } from "@app/services/api"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useDispatch } from "react-redux"
import { removeUserData } from "@app/redux/actions"

export default function Profile() {
  const session = useSelector((state) => state.stringeeReducers.session)
  const [token, setToken] = useState("")
  const dispatch = useDispatch()
  const onLogout = async () => {
    await remove(KEYSTORAGE.LOGIN_DATA)
    dispatch(removeUserData())
    navigate("Login")
    api.apisauce.setHeader("access-token", "")
    await GoogleSignin.signOut()
  }

  const getTokenFirebase = async () => {
    const tokenFi = await messaging().getToken()
    setToken(tokenFi)
  }
  useEffect(() => {
    getTokenFirebase()
  }, [])
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginHorizontal: WIDTH(spacing.md),
          textAlign: "center",
          marginBottom: HEIGHT(spacing.md),
        }}
      >
        {token}
      </Text>
      <IconButton
        onPress={() => {
          Clipboard.setString(token)
          showToastMessage("Coppy thành công!", EToastType.INFO)
        }}
        icon={"content-copy"}
      />
      <Button onPress={onLogout} mode="outlined">
        Đăng xuất
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
