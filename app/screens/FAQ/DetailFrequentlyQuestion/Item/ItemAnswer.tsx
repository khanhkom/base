import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import R from "@app/assets"
export default function ItemAnswer({ answer }: { answer: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text size="ba" weight="medium" style={{ color: colors.white }}>
          Trả lời bởi:
        </Text>
        <List.Item
          style={{ paddingBottom: 0 }}
          title={() => {
            return (
              <View>
                <Text size="md" weight="medium" style={{ color: colors.white }}>
                  Chuyên gia y tế SDoctor
                </Text>
                <Text size="sm" weight="normal" style={{ color: colors.primary_3 }}>
                  Khoa: Tai - Mũi - Họng
                </Text>
              </View>
            )
          }}
          left={() => {
            return <Image source={R.images.logo_single} style={styles.avatar} />
          }}
        />
        <Image source={R.images.background_item} style={styles.background} />
      </View>
      <View style={styles.content}>
        <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
          {answer}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: HEIGHT(spacing.sm),
  },
  card: {
    backgroundColor: colors.primary_8,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },
  content: {
    paddingTop: HEIGHT(spacing.xs),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  avatar: {
    height: WIDTH(64),
    width: WIDTH(64),
    borderRadius: 8,
  },
  background: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: WIDTH(80),
  },
})
