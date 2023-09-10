import { StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"

export default function Test() {
  useEffect(() => {
    let data = [
      {
        create_user: "newpasoketu+1@gmail.com",
        plan_id: 0,
      },
      {
        create_user: "newpasoketu+2@gmail.com",
        plan_id: 472,
      },
      {
        create_user: "newpasoketu+3@gmail.com",
        plan_id: 472,
      },
      {
        create_user: "newpasoketu+4@gmail.com",
        plan_id: 472,
      },
      {
        create_user: "newpasoketu+5@gmail.com",
        plan_id: 0,
      },
      {
        create_user: "newpasoketu+6@gmail.com",
        plan_id: 0,
      },
    ]
    let groupedArray = []

    data.forEach((object, index) => {
      if (object.plan_id !== 0) {
        let lastGroup = groupedArray[groupedArray.length - 1]
        if (lastGroup && lastGroup[0].plan_id === object.plan_id) {
          lastGroup.push(object)
        } else {
          groupedArray.push([object])
        }
      } else {
        groupedArray.push([object])
      }
    })

    // Log the result
    console.log(groupedArray)
  }, [])
  return (
    <View>
      <Text>Test</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
