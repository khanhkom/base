import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import ItemComment from "./ItemComment"
import { HEIGHT } from "@app/config/functions"
import colors from "@app/assets/colors"
import ItemAction from "./ItemAction"
const DATA_FAKE = [
  {
    name: "B.s Nguyễn văn A",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    like: 120,
    reply: [
      {
        name: "B.s Nguyễn văn A",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        like: 120,
      },
      {
        name: "B.s Nguyễn văn A",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        like: 120,
      },
    ],
  },
  {
    name: "B.s Nguyễn văn A",
    comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    like: 120,
    image:
      "https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/alt-5ae892611bf1a-5168-68b2575aab38f2c97ce8846381d07044@1x.jpg",
  },
]
export default function ListComment() {
  return (
    <View>
      <FlatList
        data={DATA_FAKE}
        ListHeaderComponent={() => <ItemAction />}
        renderItem={({ item, index }) => {
          return <ItemComment item={item} />
        }}
        style={{ paddingBottom: HEIGHT(100), backgroundColor: colors.white }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})
