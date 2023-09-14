import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { Header } from "@app/components/Header"
import { GiftedChat } from "react-native-gifted-chat"
import { StringeeClient } from "stringee-react-native"
import { useSelector } from "@app/redux/reducers"
import moment from "moment"
import { goBack } from "@app/navigators/navigationUtilities"
export default function ChatDetail({ route }) {
  const session = useSelector((state) => state.stringeeReducers.session)
  const [userId, setUserId] = useState("")
  const convid = route?.params?.item?.id
  const [messages, setMessages] = useState([])
  const client = useRef(null)
  const sendMessage = (content) => {
    const msg = {
      message: {
        // for message text + message link
        content: content,
      },
      type: 1,
      convId: convid,
    }
    client.current.sendMessage(msg, (status, code, message) => {
      console.log("Send message: " + message)
    })
  }
  const onSend = useCallback((messages = []) => {
    sendMessage(messages[0]?.text)
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
  }, [])
  // The client connects to Stringee server
  const onConnect = ({ userId }) => {
    console.log("onConnect - " + userId)
    setUserId(userId)
  }

  // The client disconnects from Stringee server
  const onDisConnect = () => {
    console.log("onDisConnect")
    setUserId("")
  }
  // The client fails to connects to Stringee server
  const onFailWithError = ({ code, message }) => {
    console.log("onFailWithError: code-" + code + " message: " + message)
    setUserId("")
  }

  // Access token is expired. A new access token is required to connect to Stringee server
  const onRequestAccessToken = () => {
    console.log("onRequestAccessToken")
  }

  // Receive custom message
  const onCustomMessage = ({ data }) => {
    console.log("onCustomMessage: " + data)
  }
  const getConversationById = (convId) => {
    console.log("CCCCCCCCCCC", convId)
    client.current.getConversationById(convId, (status, code, message, conversation) => {
      console.log(
        "Get conversation by id: " + message + " \nconversation -" + JSON.stringify(conversation),
      )
      if (status) {
        console.log("------")
      }
    })
  }
  const getMessagesBefore = () => {
    const count = 10
    const isAscending = true
    const loadDeletedMessage = false
    const loadDeletedMessageContent = false

    client.current.getMessagesBefore(
      convid,
      new Date().getTime(),
      count,
      isAscending,
      loadDeletedMessage,
      loadDeletedMessageContent,
      (status, code, message, messages) => {
        console.log("Get messages after: " + message + "\nmessages - " + JSON.stringify(messages))
        if (status) {
          let allMsg = []
          messages?.reverse().map((item, index) => {
            let msgConvert = {
              _id: item?.id,
              text: item?.content?.content || `Đã tạo nhóm ${item?.content?.groupName}`,
              system: !!item?.content?.groupName,
              createdAt: new Date(item?.createdAt),
              user: {
                _id: item?.sender,
                name: item?.sender,
                avatar:
                  "https://cdn.tuoitre.vn/471584752817336320/2023/5/10/iu6-1683694373791472731774.png",
              },
            }
            allMsg.push(msgConvert)
          })
          setMessages(allMsg)
          console.log("messages_messages", messages)
        }
      },
    )
  }
  const onObjectChange = ({ objectType, objectChanges, changeType }) => {
    console.log(
      "AAAAAAAAAAAAAAAAAA" +
        objectType +
        "\n changeType - " +
        changeType +
        "\n objectChanges - " +
        JSON.stringify(objectChanges),
    )
    const lastMsg = objectChanges[0]?.lastMessage
    if (lastMsg&&!messages.find(item=>item._id===lastMsg.id)) {
      let newMsg = [
        {
          _id: lastMsg?.id,
          text: lastMsg?.content?.content || `Đã tạo nhóm ${lastMsg?.content?.groupName}`,
          system: !!lastMsg?.content?.groupName,
          createdAt: new Date(lastMsg?.createdAt),
          user: {
            _id: lastMsg?.sender,
            name: lastMsg?.sender,
            avatar:
              "https://cdn.tuoitre.vn/471584752817336320/2023/5/10/iu6-1683694373791472731774.png",
          },
        },
      ]
      if(Platform.OS==='android'){
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMsg))
      }else{
        getMessagesBefore()
      }
     // 
    }
  }
  useEffect(() => {
    const token = session?.access_token
    console.log("AAAA", token)
    client.current.connect(token)
    setTimeout(()=>{
      getMessagesBefore()
    },1000)
  }, [])
  return (
    <View style={styles.container}>
      <Header
        title={route?.params?.item?.name}
        leftIcon="arrow_left"
        rightIcon="delete"
        onRightPress={() => {
          client.current.deleteConversation(convid, (status, code, message) => {
            console.log("Delete conversation: " + message)
            goBack()
            route?.params?.getLastConversations?.()
          })
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
