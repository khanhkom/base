import { useSelector } from "@app/redux/reducers"
import { firebase } from "@react-native-firebase/database"
import firestore from "@react-native-firebase/firestore"
import { useEffect, useState } from "react"

const useHookChat = () => {
  const [chats, setChats] = useState([])
  // const [user, setUser] = useState(null)
  const user = useSelector((state) => state.userReducers.user)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      console.log("currentUser::", currentUser)
      if (currentUser) {
        // setUser(currentUser)
      } else {
        // setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])
  useEffect(() => {
    firebase
      .app()
      .database("https://bacsivietnam-default-rtdb.asia-southeast1.firebasedatabase.app/")
      .ref(`/chats`)
      .on("value", (snapshot) => {
        const data = snapshot.val()
        // const data = snapshot.val()
        console.log("User data: ", snapshot.val())

        console.log("value: ", snapshot.val())
      })
  }, [])
  useEffect(() => {
    firebase
      .app()
      .database("https://bacsivietnam-default-rtdb.asia-southeast1.firebasedatabase.app/")
      .ref(`/chats`)
      .orderByChild("userA/id")
      .equalTo(user?.id)
      .on("value", (snapshot) => {
        // Loop through each chat in the result set
        console.log("snapshot data: ", snapshot.val())
        const data = snapshot.val()
        if (data && data !== null) {
          const dataArray = Object.keys(data).map((key) => data[key])
          setChats(dataArray.sort((a, b) => b.id - a.id))
        }
      })

    firebase
      .app()
      .database("https://bacsivietnam-default-rtdb.asia-southeast1.firebasedatabase.app/")
      .ref(`/chats`)
      .orderByChild("userB/id")
      .equalTo(user?.id)
      .on("value", (snapshot) => {
        // Loop through each chat in the result set
        console.log("snapshot data: ", snapshot.val())
        const data = snapshot.val()
        if (data && data !== null) {
          const dataArray = Object.keys(data).map((key) => data[key])
          setChats(dataArray.sort((a, b) => b.id - a.id))
        }
      })
  }, [])
  return { chats, user }
}

export default useHookChat
