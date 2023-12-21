import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { navigate } from "@app/navigators/navigationUtilities"
import { spacing } from "@app/theme/spacing"
import moment from "moment"
import React, { useState, useCallback, useEffect } from "react"
import { View, StyleSheet, KeyboardAvoidingView, Platform, TextInput } from "react-native"
import { GiftedChat, InputToolbar } from "react-native-gifted-chat"
const user1 = {
  _id: 1,
  name: "React Native",
  avatar:
    "https://img.freepik.com/premium-psd/psd-3d-rendering-customer-service-center-3d-icon-isolated-illustration_460336-1845.jpg",
}
const user2 = {
  _id: 2,
  name: "React Native",
  avatar:
    "https://img.freepik.com/premium-psd/psd-3d-rendering-customer-service-center-3d-icon-isolated-illustration_460336-1845.jpg",
}

const LIST_ACTION = ["ic_attach", "gallery", "take_photo"]
export function DetailConversation() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Lorem Ipsum is simply dummy",
        createdAt: new Date("12-12-2023"),
        user: user1,
      },
      {
        _id: 2,
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        createdAt: new Date(),
        user: user1,
      },
      {
        _id: 3,
        text: "Lorem Ipsum is simply dummy",
        createdAt: new Date(),
        user: user2,
      },
      {
        _id: 4,
        text: "Lorem Ipsum is simply dummy",
        createdAt: new Date(),
        user: user2,
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])

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
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 2,
        }}
        messagesContainerStyle={{ paddingBottom: HEIGHT(spacing.xl) }}
        renderInputToolbar={() => {
          return (
            <InputToolbar
              primaryStyle={styles.primaryStyle}
              renderSend={() => {
                return <Icon icon="send" size={WIDTH(28)} />
              }}
              renderComposer={() => {
                return (
                  <View style={styles.wrapperIcon}>
                    <TextInput
                      placeholder="Gửi tin nhắn"
                      placeholderTextColor={colors.gray_6}
                      style={styles.textInput}
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
    minHeight:HEIGHT(44)
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
