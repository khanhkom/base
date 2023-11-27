import { StyleSheet, Image } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import { Card, Divider, List } from "react-native-paper"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Toggle } from "@app/components/Toggle"
import R from "@app/assets"

export default function SocialConnect({ setIndexSocial, setVisible }) {
  return (
    <Card mode="contained" style={styles.card}>
      <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
        Liên kết tài khoản
      </Text>
      <List.Item
        left={() => {
          return <Image source={R.images.ic_face} style={styles.logo} resizeMode="contain" />
        }}
        onPress={() => {
          setIndexSocial(0)
          setVisible(true)
        }}
        title={() => {
          return (
            <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
              Facebook
            </Text>
          )
        }}
        right={() => {
          return <Toggle variant="switch" />
        }}
      />
      <Divider style={{ marginHorizontal: WIDTH(spacing.md), marginLeft: WIDTH(spacing.xxl) }} />

      <List.Item
        left={() => {
          return <Image source={R.images.ic_google} style={styles.logo} resizeMode="contain" />
        }}
        style={{ paddingBottom: 0 }}
        onPress={() => {
          setIndexSocial(1)
          setVisible(true)
        }}
        title={() => {
          return (
            <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
              Google
            </Text>
          )
        }}
        right={() => {
          return <Toggle variant="switch" />
        }}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.md),
  },
  logo: {
    height: WIDTH(32),
    width: WIDTH(32),
  },
})
