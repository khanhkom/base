import { FlatList, Image, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Card, Divider, List } from "react-native-paper"
import R from "@app/assets"
const DATA_FAKE = [
  {
    title: "Các triệu chứng của sốt xuất huyết thường xảy ra ở trẻ sơ sinh",
  },
  {
    title: "Các triệu chứng của sốt xuất huyết thường xảy ra ở trẻ sơ sinh",
  },
  {
    title: "Các triệu chứng của sốt xuất huyết thường xảy ra ở trẻ sơ sinh",
  },
]
export default function FAQ() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA_FAKE}
        renderItem={({ item, index }) => {
          return (
            <Card mode="contained" style={styles.item}>
              <List.Item
                left={() => {
                  return <Image source={R.images.ic_question} style={styles.icon} />
                }}
                style={{ paddingBottom: 0 }}
                title={() => {
                  return (
                    <View>
                      <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                        {item.title}
                      </Text>
                    </View>
                  )
                }}
              />
              <Text size="xs" weight="normal" style={styles.textTime}>
                18:00:00, 01/01/2023
              </Text>
              <Divider style={{ marginVertical: HEIGHT(10), marginLeft: WIDTH(spacing.sm) }} />
              <Text
                size="ba"
                weight="normal"
                style={{ color: colors.gray_6, marginLeft: WIDTH(spacing.sm) }}
              >
                Trả lời:<Text style={{ color: colors.gray_9 }}> Bác sĩ Nguyễn Ngọc Anh</Text>
              </Text>
            </Card>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
    alignSelf: "center",
    marginLeft: WIDTH(spacing.sm),
  },
  textTime: { color: colors.gray_6, textAlign: "right" },
})
