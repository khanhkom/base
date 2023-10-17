import { StyleSheet, Image, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import R from "@app/assets"
import { Card, Divider, List } from "react-native-paper"
export default function BaseInfor() {
  return (
    <View style={styles.container}>
      <Image source={R.images.avatar_docter_rec} style={styles.doctorImage} resizeMode="contain" />
      <Text size="xxl" weight="semiBold" style={styles.name}>
        B.s Nguyễn Văn A
      </Text>
      <Card mode="contained" style={styles.card}>
        <List.Item
          title={() => {
            return (
              <Text size="ba" weight="normal" style={{ color: colors.gray_7 }}>
                Số điện thoại
              </Text>
            )
          }}
          right={() => {
            return (
              <Text size="ba" weight="normal" style={{ color: colors.gray_6 }}>
                0123 456 789
              </Text>
            )
          }}
        />
        <Divider style={{ marginHorizontal: WIDTH(spacing.md) }} />
        <List.Item
          title={() => {
            return (
              <Text size="ba" weight="normal" style={{ color: colors.gray_7 }}>
                Email
              </Text>
            )
          }}
          right={() => {
            return (
              <Text size="ba" weight="normal" style={{ color: colors.gray_6 }}>
                abc@gmail.com
              </Text>
            )
          }}
        />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(32),
    marginBottom: HEIGHT(spacing.md),
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: WIDTH(spacing.md),
  },
  name: { color: colors.gray_9, marginBottom: HEIGHT(spacing.xxs), textAlign: "center" },
  doctorImage: {
    height: WIDTH(148),
    width: WIDTH(111),
    borderRadius: WIDTH(12),
    marginBottom: HEIGHT(spacing.md),
    alignSelf: "center",
  },
  card: {
    backgroundColor: colors.white,
    marginTop: HEIGHT(spacing.xl),
    marginBottom: HEIGHT(spacing.sm),
  },
})
