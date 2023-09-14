import { FlatList, StyleSheet, Image, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "@app/components/Header"
import { Avatar, Button, Dialog, FAB, List, TextInput } from "react-native-paper"
import colors from "@app/assets/colors"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { StringeeClient } from "stringee-react-native"
import { Text } from "@app/components/Text"
import moment from "moment"
import { navigate } from "@app/navigators/navigationUtilities"

export default function Conversations({ route }) {
  const client = useRef(null)
  const [userId, setUserId] = useState("")
  const [conversations, setConversations] = useState([])
  const [log, setLog] = useState([])
  const [visible, setVisible] = React.useState(false)
  const [chatName, setChatName] = React.useState("")
  const [targetId, setTargetId] = React.useState("")

  const showDialog = () => setVisible(true)

  const hideDialog = () => setVisible(false)

  const addLog = (data) => {
    let newLog = [...log]
    newLog.push(data)
    setLog(newLog)
  }
  // The client connects to Stringee server
  const onConnect = ({ userId }) => {
    console.log("onConnect - " + userId)
    setUserId(userId)
    addLog("onConnect - " + userId)
  }

  // The client disconnects from Stringee server
  const onDisConnect = () => {
    console.log("onDisConnect")
    setUserId("")
    addLog("onDisConnect")
  }
  // The client fails to connects to Stringee server
  const onFailWithError = ({ code, message }) => {
    console.log("onFailWithError: code-" + code + " message: " + message)
    setUserId("")
    addLog("onFailWithError: code-" + code + " message: " + message)
  }

  // Access token is expired. A new access token is required to connect to Stringee server
  const onRequestAccessToken = () => {
    console.log("onRequestAccessToken")
    addLog("onRequestAccessToken")
    // Token để kết nối tới Stringee server đã hết bạn. Bạn cần lấy token mới và gọi connect lại ở đây
    // client.current.connect('NEW_TOKEN');
  }

  // Receive custom message
  const onCustomMessage = ({ data }) => {
    console.log("onCustomMessage: " + data)
    addLog("onCustomMessage: " + data)
  }
  // Receive event of Conversation or Message
  const onObjectChange = ({ objectType, objectChanges, changeType }) => {
    console.log(
      "onObjectChange: \nobjectType - " +
        objectType +
        "\n changeType - " +
        changeType +
        "\n objectChanges - " +
        JSON.stringify(objectChanges),
    )
    addLog(
      "onObjectChange: \nobjectType - " +
        objectType +
        "\n changeType - " +
        changeType +
        "\n objectChanges - " +
        JSON.stringify(objectChanges),
    )
  }

  const addConversation = (conversation) => {
    let newConversations = [...conversations]
    newConversations.push(conversation)
    setConversations(newConversations)
  }
  const createConversation = (options, participant) => {
    client.current.createConversation(
      participant,
      options,
      (status, code, message, conversation) => {
        console.log(
          "Create conversation: " + message + " \nconversation -" + JSON.stringify(conversation),
        )
        addLog("Create conversation: " + message)
        if (status) {
          addConversation(conversation)
        }
      },
    )
  }
  const getLastConversations = () => {
    const count = 10
    const isAscending = true

    client?.current?.getLastConversations(
      count,
      isAscending,
      (status, code, message, conversations) => {
        console.log(
          "Get last conversations: " +
            message +
            " \nconversations -" +
            JSON.stringify(conversations),
        )
        addLog("Get last conversations: " + message)
        if (status) {
          // clearConversations()
          setConversations(conversations)
          // conversations.forEach((conversation) => {
          //   addConversation(conversation)
          // })
        }
      },
    )
  }
  useEffect(() => {
    const token = route.params.token
    client.current.connect(token)
    setTimeout(()=>{
      getLastConversations()
    },1000)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Header leftIcon="arrow_left" />
      <FlatList
        data={conversations}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              title={item?.name}
              description={item?.lastMessage?.content?.content}
              left={() => {
                return <Avatar.Image source={R.images.avatar_docter} size={WIDTH(48)} />
              }}
              style={styles.item}
              onPress={() => {
                navigate("ChatDetail", {
                  item,
                  getLastConversations,
                })
              }}
              right={() => {
                return <Text>{moment(item?.lastMessage?.createdAt).format("DD/MM/YYYY")}</Text>
              }}
            />
          )
        }}
      />
      <StringeeClient
        ref={client}
        eventHandlers={{
          onConnect: onConnect,
          onDisConnect: onDisConnect,
          onFailWithError: onFailWithError,
          onRequestAccessToken: onRequestAccessToken,
          onCustomMessage: onCustomMessage,
          onObjectChange: onObjectChange,
        }}
      />
      <FAB.Group
        open={false}
        visible
        icon={"plus"}
        actions={[{ icon: "plus", onPress: () => console.log("Pressed add") }]}
        onStateChange={() => {}}
        onPress={showDialog}
      />
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Tạo trò chuyện</Dialog.Title>
        <Dialog.Content>
          <TextInput
            value={chatName}
            onChangeText={setChatName}
            label={"Tên đoạn chat"}
            mode="outlined"
          />
          <TextInput
            style={{ marginTop: HEIGHT(spacing.md) }}
            value={targetId}
            onChangeText={setTargetId}
            label={"Nhập userid"}
            mode="outlined"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              const options = {
                name: chatName,
                isDistinct: false,
                isGroup: false,
              }
              const participant = [targetId]
              createConversation(options, participant)
              hideDialog()
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_3,
    paddingLeft: WIDTH(spacing.sm),
  },
})
