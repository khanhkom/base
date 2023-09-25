import { StyleSheet, View, Image, ScrollView } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import { Card, List } from "react-native-paper"
import R from "@app/assets"
export default function FileAttachment({ data }: { data: string[] }) {
  if (data.length > 0)
    return (
      <Card mode="contained" style={styles.container}>
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
          {data.map((item, index) => {
            return <Image key={index} source={{ uri: item }} style={styles.image} />
          })}
        </ScrollView>
      </Card>
    )
  else return null
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(100),
    paddingHorizontal: WIDTH(spacing.sm),
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
    height: HEIGHT(130),
    width: WIDTH(101),
    borderRadius: 8,
    marginRight: WIDTH(8),
  },
})
