import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { navigate } from "@app/navigators/navigationUtilities"
import { spacing } from "@app/theme/spacing"
import moment from "moment"
import React, { useState, useCallback, useEffect } from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Keyboard } from "react-native"
import { GiftedChat, InputToolbar } from "react-native-gifted-chat"
import useHookDetailChat from "./useHookDetailChat"
import { useSelector } from "@app/redux/reducers"

const LIST_ACTION = ["ic_attach", "gallery", "take_photo"]
export function DetailConversation() {
  const { messages, sendMessage } = useHookDetailChat()
  const user = useSelector((state) => state.userReducers.user)
  const patients = useSelector((state) => state.patientReducers.patients)
  const [text, setText] = useState("")
  useEffect(() => {}, [])
  console.log("messages::", messages)
  const onSend = () => {
    sendMessage(text)
    setText("")
    // Keyboard.dismiss
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon="arrow_left"
        backgroundColor={colors.white}
        title="B.s Nguyễn Văn A"
        rightIcon="view_more"
        onRightPress={() => {
          navigate("ChatProfile")
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => {
          console.log("messages_sent", messages)
        }}
        user={{
          ...user,
          _id: user?.id,
          avatar:
            patients?.[0]?.avatarUrl ??
            "https://img.freepik.com/premium-psd/psd-3d-rendering-customer-service-center-3d-icon-isolated-illustration_460336-1845.jpg",
        }}
        messagesContainerStyle={{ paddingBottom: HEIGHT(spacing.xl) }}
        renderInputToolbar={() => {
          return (
            <InputToolbar
              primaryStyle={styles.primaryStyle}
              renderSend={() => {
                return <Icon onPress={onSend} icon="send" size={WIDTH(28)} />
              }}
              renderComposer={() => {
                return (
                  <View style={styles.wrapperIcon}>
                    <TextInput
                      placeholder="Gửi tin nhắn"
                      placeholderTextColor={colors.gray_6}
                      style={styles.textInput}
                      value={text}
                      onChangeText={setText}
                    />
                  </View>
                )
              }}
              renderActions={() => {
                return (
                  <View style={styles.wrapperAction}>
                    {LIST_ACTION.map((item, index) => {
                      return <Icon icon={item} size={WIDTH(24)} key={index} style={styles.icon} />
                    })}
                  </View>
                )
              }}
            />
          )
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapperAction: {
    flexDirection: "row",
  },
  icon: {
    marginRight: WIDTH(spacing.sm),
  },
  wrapperIcon: {
    width: WIDTH(195),
    backgroundColor: colors.gray_2,
    borderRadius: 100,
  },
  textInput: {
    paddingHorizontal: WIDTH(spacing.sm),
    minHeight: HEIGHT(44),
  },
  primaryStyle: {
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopWidth: 0,
  },
})
