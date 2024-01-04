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
  const { user } = useHookChat()
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
        data={[1, 2, 3]}
        renderItem={({ item, index }) => {
          return <ItemConversation index={index} />
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
