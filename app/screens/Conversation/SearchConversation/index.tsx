import { FlatList, StyleSheet, Text, View } from "react-native"
import React, { useRef, useState } from "react"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemConversation from "@app/screens/Chat/Item/ItemConversation"
import EmptyMess from "@app/screens/Chat/Item/EmptyMess"
import Header from "./Item/Header"
const STATUS_SEARCH = {
  recent: 0,
  suggest: 1,
  searching: 2,
  result: 3,
}
export default function SearchConversation() {
  const refModal = useRef(null)
  const [keyword, setKeyword] = useState("")
  const [searchStatus, setSearchStatus] = useState(STATUS_SEARCH.recent)
  // const searchStatus = keyword === "" ? STATUS_SEARCH.recent : STATUS_SEARCH.suggest
  const hanldeChangeText = (text: string) => {
    setKeyword(text)
    if (text !== "" && searchStatus !== STATUS_SEARCH.suggest) {
      setSearchStatus(STATUS_SEARCH.suggest)
    }
  }
  const onSubmitSearch = () => {
    setSearchStatus(STATUS_SEARCH.result)
  }

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
      <Header keyword={keyword} setKeyword={hanldeChangeText} onSubmitSearch={onSubmitSearch} />
      <FlatList
        data={[1, 2, 3]}
        renderItem={({ item, index }) => {
          return <ItemConversation index={index} />
        }}
        ListEmptyComponent={() => <EmptyMess />}
      />
      {/* <ButtonChatbot
        onPress={() => {
          refModal?.current?.show()
        }}
      />
      <ModalSupport ref={refModal} onPress={onPress} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
