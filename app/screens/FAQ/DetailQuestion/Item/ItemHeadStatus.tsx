import { StyleSheet, View } from "react-native"
import React from "react"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { spacing } from "@app/theme/spacing"
import { STATUS_QUESTION, STATUS_QUESTION_KEY } from "@app/config/constants"

export default function ItemHeadStatus({ status }) {
  const isReject = status === STATUS_QUESTION_KEY.REJECTED
  if (isReject) {
    return (
      <View style={[styles.head, { backgroundColor: colors.red_6 }]}>
        <Icon icon="danger" size={WIDTH(20)} />
        <Text
          size="ba"
          weight="medium"
          style={{ color: colors.white, marginLeft: WIDTH(spacing.xs) }}
        >
          {STATUS_QUESTION?.[status] ?? "Chờ bác sĩ trả lời"}
        </Text>
      </View>
    )
  }
  return (
    <View style={styles.head}>
      <Icon icon="clock" size={WIDTH(20)} />
      <Text
        size="ba"
        weight="medium"
        style={{ color: colors.orange_7, marginLeft: WIDTH(spacing.xs) }}
      >
        {STATUS_QUESTION?.[status] ?? "Chờ bác sĩ trả lời"}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    backgroundColor: colors.orange_0,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
    flexDirection: "row",
    marginBottom: HEIGHT(spacing.sm),
  },
})
