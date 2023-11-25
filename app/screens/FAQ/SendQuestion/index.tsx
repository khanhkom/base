import { StyleSheet, View, Image, ScrollView } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import ItemNote from "./Item/ItemNote"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import FileAttachment from "./Item/FileAttachment"
import PopupSuccess from "./Item/PopupSuccess"
import { Text } from "@app/components/Text"

interface IScreenParams {
  route: {
    params: {}
  }
}
export default function SendQuestion({ route }: IScreenParams) {
  const [question, setQuestion] = useState("")
  const [listImage, setListImage] = useState([])
  const [desciption, setDesciption] = useState("")
  const [visible, setVisible] = React.useState(false)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title={"Đặt câu hỏi"} backgroundColor={colors.white} />
      <ScrollView style={styles.body}>
        <ItemNote />
        <TextField
          label={"Câu hỏi"}
          style={{ color: colors.gray_9, minHeight: HEIGHT(80) }}
          value={question}
          onChangeText={setQuestion}
          placeholder={"Nhập câu hỏi"}
          containerStyle={{ marginTop: HEIGHT(spacing.md) }}
        ></TextField>
        <View style={styles.flexRow}>
          <Text preset="formLabel">Mô tả</Text>
          <Text size="sm" weight="normal" style={{ color: colors.gray_9 }}>
            {desciption.length}
            <Text size="sm" weight="normal" style={{ color: colors.gray_6 }}>
              /1000
            </Text>
          </Text>
        </View>
        <TextField
          style={{ color: colors.gray_9, minHeight: HEIGHT(151) }}
          value={desciption}
          multiline
          onChangeText={setDesciption}
          placeholder={"Nhập mô tả"}
          containerStyle={{ marginTop: HEIGHT(spacing.md) }}
        ></TextField>
        <FileAttachment listImage={listImage} setListImage={setListImage} />
        <View style={{ height: HEIGHT(120) }} />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button mode="contained" style={styles.button} onPress={() => {}}>
          Đặt câu hỏi
        </Button>
      </View>
      <PopupSuccess
        visible={visible}
        setVisible={setVisible}
        title="Gửi câu hỏi thành công"
        desc="Quý khách vui lòng chờ câu trả lời, tư vấn từ bác sĩ của SDoctor!"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: HEIGHT(spacing.md),
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: getWidth(),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.md),
  },
  button: {
    borderRadius: 8,
  },
  body: {
    paddingHorizontal: WIDTH(spacing.md),
  },
})
