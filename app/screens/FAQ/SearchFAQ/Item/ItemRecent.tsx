import { FlatList, Pressable, StyleSheet, View } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import { Icon } from "@app/components/Icon"
import ItemEmpty from "@app/components/ItemEmpty"

interface ItemProps {
  data: string[]
  onRemove: (val: string) => void
  onPressItem: (val: string) => void
}
export default function ItemRecent({ data, onRemove, onPressItem }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text size="md" weight="semiBold" style={{ color: colors.gray_9 }}>
        Gần đây
      </Text>
      <FlatList
        data={data}
        ListEmptyComponent={() => <ItemEmpty title="Chưa có tìm kiếm gần đây." />}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              style={styles.item}
              title={() => {
                return (
                  <Pressable onPress={() => onPressItem(item)}>
                    <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                      {item}
                    </Text>
                  </Pressable>
                )
              }}
              right={() => {
                return (
                  <View style={{ alignSelf: "center" }}>
                    <Icon
                      onPress={() => onRemove(item)}
                      icon="x_close"
                      size={WIDTH(20)}
                      color={colors.gray_5}
                    />
                  </View>
                )
              }}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.md),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
  },
})
