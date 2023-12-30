import { StyleSheet, View, Image, ScrollView, Platform } from "react-native"
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
import { EToastType, showToastMessage } from "@app/utils/library"
import { createQuestion } from "@app/services/api/functions/question"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Screen } from "@app/components/Screen"

interface IScreenParams {
  route: {
    params: {}
  }
}
export default function SendQuestion({ route }: IScreenParams) {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [listImage, setListImage] = useState([])
  const [desciption, setDesciption] = useState("")
  const [visible, setVisible] = React.useState(false)
  const onSendQuestion = async () => {
    if (question.trim() === "") {
      showToastMessage("Vui lòng nhập câu hỏi!", EToastType.ERROR)
    } else if (desciption.trim() === "") {
      showToastMessage("Vui lòng nhập mô tả!", EToastType.ERROR)
    } else {
      const formData = new FormData()
      formData.append("title", question)
      formData.append("content", desciption)

      listImage.map((item) => {
        const bodyImage = {
          name: item.fileName || item.uri,
          type: item.type,
          uri: Platform.OS === "ios" ? item.uri.replace("file://", "") : item.uri,
        }
        formData.append("patientFiles", bodyImage)
      })
      setLoading(true)
      const questionCreate = await createQuestion(formData)
      if (questionCreate?.status === 201) {
        setVisible(true)
      } else {
        showToastMessage("Có lỗi xảy ra vui lòng thử lại!", EToastType.ERROR)
      }
      console.log("questionCreate::", questionCreate?.status, questionCreate?.data)
      setLoading(false)
    }
  }
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header leftIcon="arrow_left" title={"Đặt câu hỏi"} backgroundColor={colors.white} />
      <KeyboardAwareScrollView style={styles.body}>
        <ItemNote />
        <TextField
          label={"Câu hỏi"}
          style={{ color: colors.gray_9, minHeight: HEIGHT(80), textAlignVertical: "top" }}
          value={question}
          multiline
          onChangeText={setQuestion}
          textAlignVertical="top"
          placeholder={"Nhập câu hỏi"}
          containerStyle={{ marginTop: HEIGHT(spacing.md) }}
        ></TextField>
        <View style={styles.flexRow}>
          <Text preset="formLabel">Mô tả</Text>
          <Text size="sm" weight="normal" style={{ color: colors.gray_9 }}>
            {desciption.length}
            <Text size="sm" weight="normal" style={{ color: colors.gray_6 }}>
              /1000 ký tự
            </Text>
          </Text>
        </View>
        <TextField
          style={{ color: colors.gray_9, minHeight: HEIGHT(151) }}
          value={desciption}
          multiline
          onChangeText={setDesciption}
          maxLength={1000}
          placeholder={"Nhập mô tả"}
          containerStyle={{ marginTop: HEIGHT(spacing.md) }}
        ></TextField>
        <FileAttachment listImage={listImage} setListImage={setListImage} />
        <View style={{ height: HEIGHT(120) }} />
      </KeyboardAwareScrollView>
      <View style={styles.buttonWrapper}>
        <Button loading={loading} mode="contained" style={styles.button} onPress={onSendQuestion}>
          Đặt câu hỏi
        </Button>
      </View>
      {loading && <LoadingOpacity />}
      <PopupSuccess
        visible={visible}
        setVisible={setVisible}
        title="Gửi câu hỏi thành công"
        desc="Quý khách vui lòng chờ câu trả lời, tư vấn từ bác sĩ của SDoctor!"
      />
    </Screen>
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
