import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import { Button, TextInput } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"

export default function ConfirmName() {
  const [text, setText] = React.useState("")

  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Xác nhận họ tên" backgroundColor={colors.white} />
      <TextInput
        mode="outlined"
        label="Nhập họ và tên"
        value={text}
        style={{
          marginHorizontal: WIDTH(spacing.md),
          marginTop: HEIGHT(spacing.lg),
        }}
        outlineStyle={{ borderRadius: 8, borderColor: colors.main_6 }}
        onChangeText={(text) => setText(text)}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          navigate("CreateProfile")
        }}
      >
        Tiếp tục
      </Button>
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
    position: "absolute",
    bottom: HEIGHT(spacing.md),
    marginLeft: WIDTH(spacing.md),
    borderRadius: 8,
  },
})
