import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Button } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
import { useSelector } from "@app/redux/reducers"
import { KEYSTORAGE, remove } from "@app/utils/storage"

export default function Profile() {
  const session = useSelector((state) => state.stringeeReducers.session)
  const onLogout = () => {
    remove(KEYSTORAGE.LOGIN_DATA)
    navigate("Login")
  }
  return (
    <View style={styles.container}>
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
