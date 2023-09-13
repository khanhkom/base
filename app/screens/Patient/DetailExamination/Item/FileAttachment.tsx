import { StyleSheet, View, Image, ScrollView } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import { Card, List } from "react-native-paper"
import R from "@app/assets"
export default function FileAttachment() {
  return (
    <View style={styles.container}>
      <List.Item
        left={() => {
          return (
            <View style={styles.boxIcon}>
              <Icon icon={"document_text"} size={WIDTH(20)} color={colors.primary} />
            </View>
          )
        }}
        title={() => {
          return (
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              Tệp đính kèm
            </Text>
          )
        }}
      />
      <ScrollView horizontal style={styles.card}>
        <Image source={R.images.file_attach} style={styles.image} />
        <Image source={R.images.file_attach} style={styles.image} />
        <Image source={R.images.file_attach} style={styles.image} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginBottom: HEIGHT(100),
    paddingBottom: HEIGHT(spacing.sm),
  },
  card: {
    flexDirection: "row",
  },
  boxIcon: {
    height: WIDTH(32),
    width: WIDTH(32),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_0,
  },
  image: {
    height: HEIGHT(140),
    width: WIDTH(109),
    borderRadius: 8,
    marginRight: WIDTH(8),
  },
})
