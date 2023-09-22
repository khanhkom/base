import { StyleSheet, View } from "react-native"
import React from "react"
import { Card, List } from "react-native-paper"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/Icon"
const ItemValue = ({ title, value }) => {
  return (
    <Text size="ba" weight="normal" style={{ color: colors.gray_6, marginTop: HEIGHT(8) }}>
      {title}{" "}
      <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
        {value}
      </Text>
    </Text>
  )
}
interface ItemProps {
  item: {
    title: string
    icon: string
    data: { title: string; type: string }[]
  }
  returnDataByField: (type: string) => string
}
export default function ItemBookInformation({ item, returnDataByField }: ItemProps) {
  return (
    <Card style={styles.card} mode="contained">
      <List.Item
        left={() => {
          return (
            <View style={styles.boxIcon}>
              <Icon icon={item?.icon} size={WIDTH(20)} color={colors.primary} />
            </View>
          )
        }}
        title={() => {
          return (
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              {item?.title}
            </Text>
          )
        }}
      />
      {item?.data.map((item, index) => {
        return <ItemValue key={index} title={item.title} value={returnDataByField(item.type)} />
      })}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  boxIcon: {
    height: WIDTH(32),
    width: WIDTH(32),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_0,
  },
})
