import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import EmptyMess from "./Item/EmptyMess"

export default function ChatScreen() {
  return (
    <View>
      <Header leftIcon="menu" />
      <EmptyMess />
    </View>
  )
}

const styles = StyleSheet.create({})
