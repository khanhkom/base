import { StyleSheet, Image, View } from "react-native"
import React, { useState } from "react"
import { List } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import R from "@app/assets"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import { Text } from "@app/components/Text"
import { spacing } from "@app/theme/spacing"
import { IExperience } from "@app/interface/docter"
interface Item {
  title: string
  icon: string
  type: "text" | "list"
  data: string | string[]
}

export default function ItemExperience({
  item,
  data,
}: {
  item: Item
  data: IExperience[] | string[]
}) {
  const [isShow, setShow] = useState(false)
  console.log("data", data)
  return (
    <View style={styles.container}>
      <List.Item
        title={() => {
          return (
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              {item?.title}
            </Text>
          )
        }}
        left={() => {
          return (
            <View style={styles.iconWrapper}>
              <Icon icon={item?.icon} style={styles.icon} />
            </View>
          )
        }}
      />
      {item.type === "list" ? (
        <View>
          {data?.map((item, index) => {
            if (isShow || (!isShow && index < 2))
              return (
                <Text
                  key={index}
                  weight="normal"
                  size="ba"
                  style={{ color: colors.gray_7, marginLeft: WIDTH(spacing.xs) }}
                >
                  {item?.timeRange ? `${item?.timeRange}: ${item?.description}` : item}
                </Text>
              )
          })}
          {data?.length > 2 && (
            <Text
              size="ba"
              weight="normal"
              style={styles.textMore}
              onPress={() => setShow((val) => !val)}
            >
              {isShow ? "Ẩn bớt" : "Xem thêm"}
            </Text>
          )}
        </View>
      ) : (
        <Text weight="normal" size="ba" style={{ color: colors.gray_7 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: WIDTH(32),
    height: WIDTH(32),
    borderRadius: WIDTH(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_0,
  },
  icon: {
    width: WIDTH(20),
    height: WIDTH(20),
  },
  textMore: { color: colors.blue_6, textDecorationLine: "underline" },
  container: {
    marginBottom: HEIGHT(spacing.sm),
  },
})
