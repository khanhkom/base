import { StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"

export default function FileAttachment() {
  return (
    <View style={styles.container}>
      <Text preset="formLabel">Tệp đính kèm</Text>
      <View style={styles.card}>
        <View style={styles.boxIcon}>
          <Icon icon="directbox_send" size={WIDTH(24)} color={colors.gray_5} />
        </View>
        <Text size="sm" weight="normal" style={{ color: colors.gray_7 }}>
          Tải lên hồ sơ bệnh án, đơn thuốc (nếu có)
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.md),
  },
  card: {
    borderRadius: WIDTH(8),
    borderWidth: 1,
    borderColor: colors.gray_3,
    marginTop: HEIGHT(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  boxIcon: {
    width: WIDTH(40),
    height: WIDTH(40),
    borderRadius: WIDTH(20),
    backgroundColor: colors.gray_0,
    marginBottom: HEIGHT(4),
    justifyContent: "center",
    alignItems: "center",
  },
})
