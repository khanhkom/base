import { FlatList, StyleSheet, Text, View } from "react-native"
import React, { useRef } from "react"
import { Header } from "@app/components/Header"
import EmptyMess from "./Item/EmptyMess"
import ButtonChatbot from "./Item/ButtonChatbot"
import ModalSupport from "./Item/ModalSupport"
import colors from "@app/assets/colors"
import ItemConversation from "./Item/ItemConversation"
import { navigate } from "@app/navigators/navigationUtilities"
import useHookChat from "./useHookChat"

export default function ChatScreen() {
  const { chats } = useHookChat()
  const refModal = useRef(null)
  const onPress = (index) => {
    console.log(index)
    switch (index) {
      case 0:
        navigate("ChatWithSupport")
        break
      case 1:
        break
      default:
        break
    }
  }
  console.log("chats_chats", chats)
  return (
    <View style={styles.container}>
      <Header
        leftIcon="menu"
        rightIcon="ic_search"
        rightIconColor={colors.gray_9}
        title="Tin nhắn"
        onRightPress={() => {
          navigate("SearchConversation")
        }}
      />

      <FlatList
        data={chats}
        renderItem={({ item, index }) => {
          return <ItemConversation index={index} item={item} />
        }}
        ListEmptyComponent={() => <EmptyMess />}
      />
      <ButtonChatbot
        onPress={() => {
          refModal?.current?.show()
        }}
      />
      <ModalSupport ref={refModal} onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})