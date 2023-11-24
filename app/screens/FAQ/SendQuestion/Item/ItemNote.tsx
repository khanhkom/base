import { StyleSheet, View } from "react-native"
import React from "react"
import { Card } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"

const LIST_NOTE = [
  "• Giới tính và độ tuổi",
  "• Triệu chứng, dấu hiệu sức khỏe",
  "• Chẩn đoán trước đây của bác sĩ, tiền sử bệnh, các loại thuốc đang sử dụng (nếu có)",
  "• Câu hỏi dành cho bác sĩ",
]
export default function ItemNote() {
  return (
    <View>
      <Card style={styles.card} mode="contained">
        <Text size="md" weight="semiBold" style={{ color: colors.gray_9 }}>
          Hướng dẫn đặt câu hỏi:
        </Text>
        <Text
          size="ba"
          weight="normal"
          style={{ color: colors.gray_7, marginVertical: HEIGHT(spacing.xs) }}
        >
          Khi đặt câu hỏi cho bác sĩ, vui lòng lưu ý các nội dung sau đây:
        </Text>
        <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
          1. Nên cung cấp chi tiết các thông tin về
        </Text>
        {LIST_NOTE.map((item, index) => {
          return (
            <Text
              key={index}
              size="ba"
              weight="normal"
              style={{ color: colors.gray_7, marginTop: HEIGHT(spacing.xxs) }}
            >
              {item}
            </Text>
          )
        })}
        <Text
          size="ba"
          weight="medium"
          style={{ color: colors.gray_9, marginTop: HEIGHT(spacing.xs) }}
        >
          2. Hình ảnh đính kèm{" "}
          <Text size="ba" weight="normal" style={{ color: colors.gray_7 }}>
            (ảnh chụp biểu hiện, đơn thuốc, kết quả khám,...) nếu có, cần rõ nét
          </Text>
        </Text>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.indigo_0,
  },
})
