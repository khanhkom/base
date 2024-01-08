import { useEffect, useState } from "react"
import database, { firebase } from "@react-native-firebase/database"
import moment from "moment"
import { useSelector } from "@app/redux/reducers"
import { createChatId } from "@app/config/functions"
import { IDocter } from "@app/interface/docter"

const useHookDetailChat = (targetUser: IDocter) => {
  const [messages, setMessages] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  const user = useSelector((state) => state.userReducers.user)
  const currentUserId = user?.id
  const patients = useSelector((state) => state.patientReducers.patients)
  const chatId = createChatId(currentUserId, targetUser?.userId)
  console.log("targetUser::", targetUser, user)
  useEffect(() => {
    // firebase
    //   .app()
    //   .database("https://bacsivietnam-default-rtdb.asia-southeast1.firebasedatabase.app/")
    //   .ref(`/messages/${chatId}`)
    //   .once("value")
    //   .then((snapshot) => {
    //     const data = snapshot.val()
    //     console.log("User data: ", snapshot.val())
    //     if (data && data !== null) {
    //       const dataArray = Object.keys(data).map((key) => data[key])
    //       setMessages(dataArray)
    //     } else {
    //       setMessages([])
    //     }
    //   })
  }, [])
  useEffect(() => {
    // sendMessage("bbbbb")
  }, [])
  // listen change
  useEffect(() => {
    firebase
      .app()
      .database("https://bacsivietnam-default-rtdb.asia-southeast1.firebasedatabase.app/")
      .ref(`/messages/${chatId}`)
      .on("value", (snapshot) => {
        const data = snapshot.val()
        // const data = snapshot.val()
        console.log("User data: ", snapshot.val())
        if (data && data !== null) {
          const dataArray = Object.keys(data).map((key) => data[key])
          setMessages(dataArray.sort((a, b) => b.id - a.id))
        } else {
          setMessages([])
        }
        console.log("value: ", snapshot.val())
      })
  }, [])
  const sendMessage = (text) => {
    // update list message
    firebase
      .app()
      .database("https://bacsivietnam-default-rtdb.asia-southeast1.firebasedatabase.app/")
      .ref(`/messages/${chatId}`)
      .push()
      .set({
        _id: new Date().getTime(),
        text,
        id: new Date().getTime(),
        createdAt: new Date(),
        user: {
          _id: user?.id,
          name: user?.fullname,
          avatar: patients?.[0]?.avatarUrl,
        },
      })
      .then(() => console.log("sendMessage set."))
      .catch((err) => console.log(err))
    // update last message
    firebase
      .app()
      .database("https://bacsivietnam-default-rtdb.asia-southeast1.firebasedatabase.app/")
      .ref(`/chats/${chatId}`)
      .set({
        title: `${chatId}`,
        lastMessage: text,
        userA: {
          id: user?.id,
          name: user?.fullname,
          avatar: patients?.[0]?.avatarUrl,
        },
        userB: {
          id: targetUser?.userId,
          name: targetUser?.name,
          avatar: targetUser?.avatarUrl ?? "",
        },
        timestamp: new Date().getTime(),
        user: {
          _id: user?.id,
          name: user?.fullname,
          avatar: patients?.[0]?.avatarUrl,
        },
      })
      .then(() => console.log("last message set."))
      .catch((err) => console.log(err))
  }
  return { messages, sendMessage }
}
export default useHookDetailChat
