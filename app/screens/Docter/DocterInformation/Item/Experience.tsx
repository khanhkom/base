import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import ItemExperience from "./ItemExperience"
import { IDocter } from "@app/interface/docter"
const DATA_EXPERIENCE = [
  {
    title: "Giới thiệu",
    icon: "user_search",
    type: "text",
  },
  {
    title: "Chuyên khoa",
    icon: "department",
    field: "department",
    type: "list",
  },
  {
    title: "Kinh nghiệm",
    icon: "briefcase",
    field: "briefcase",
    type: "list",
  },
  {
    title: "Giới thiệu",
    icon: "award",
    field: "award",
    type: "list",
  },
]

export default function Experience({ data }: { data: IDocter }) {
  const returnData = (type) => {
    if (type === "briefcase") return data?.experience
    if (type === "award") return data?.education
    if (type === "department") return data?.specialist.map((item) => item.value)
  }
  return (
    <View style={styles.container}>
      <Text>Experience</Text>
      <FlatList
        data={DATA_EXPERIENCE}
        renderItem={({ item, index }) => {
          return <ItemExperience item={item} data={returnData(item.field)} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: WIDTH(16),
    borderTopRightRadius: WIDTH(16),
    backgroundColor: colors.white,
    marginTop: HEIGHT(spacing.md),
    paddingVertical: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
  },
})
