import { FlatList, StyleSheet, Text, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import ItemExperience from "./ItemExperience"
const DATA_EXPERIENCE = [
  {
    title: "Giới thiệu",
    icon: "user_search",
    type: "text",
    data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  },
  {
    title: "Chuyên khoa",
    icon: "department",
    type: "list",
    data: ["• Răng hàm mặt", "• Tai - Mũi -Họng"],
  },
  {
    title: "Giới thiệu",
    icon: "briefcase",
    type: "list",
    data: [
      "• 2016 - 2022: Đại học Y Hà Nội",
      "• 2022 - 2025: Bác sĩ nội trú",
      "• 2022 - 2025: Bác sĩ nội trú",
      "• 2022 - 2025: Bác sĩ nội trú",
    ],
  },
  {
    title: "Giới thiệu",
    icon: "award",
    type: "list",
    data: ["• 2022 - 2023: Bệnh viện Đại học Y Hà Nội"],
  },
]

export default function Experience() {
  return (
    <View style={styles.container}>
      <Text>Experience</Text>
      <FlatList
        data={DATA_EXPERIENCE}
        renderItem={({ item, index }) => {
          return <ItemExperience item={item} />
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
