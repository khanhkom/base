import { Image, StyleSheet, View } from "react-native"
import React from "react"
import { Card, List } from "react-native-paper"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { QuestionAnswer } from "@app/interface/faq"
export default function ItemQuestion({ item }: { item: QuestionAnswer }) {
  return (
    <Card
      onPress={() => {
        navigate("DetailFrequentlyQuestion", { data: item })
      }}
      mode="contained"
      style={styles.item}
    >
      <List.Item
        left={() => {
          return <Image source={R.images.ic_question} style={styles.icon} />
        }}
        style={{ paddingBottom: 0 }}
        title={() => {
          return (
            <View>
              <Text numberOfLines={3} size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                {item?.patientQuestion}
              </Text>
              <Text
                numberOfLines={2}
                size="ba"
                weight="normal"
                style={{ color: colors.gray_7, marginTop: HEIGHT(spacing.xs) }}
              >
                Bác sĩ trả lời: {item?.doctorAnswer}
              </Text>
            </View>
          )
        }}
      />
      {/* <Text size="sm" weight="normal" style={styles.textTime}>
        Chuyên khoa: Tai Mũi Họng
      </Text> */}
    </Card>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
    marginHorizontal: WIDTH(spacing.md),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
    marginLeft: WIDTH(spacing.sm),
  },
  textTime: { color: colors.primary, textAlign: "right", fontStyle: "italic" },
})
