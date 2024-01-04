import { firebase } from "@react-native-firebase/database"
import firestore from "@react-native-firebase/firestore"
import { useEffect, useState } from "react"

const useHookChat = () => {
  const [chats, setChats] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      console.log("currentUser::", currentUser)
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])
  useEffect(() => {}, [])
  return { chats, user }
}

export default useHookChat
