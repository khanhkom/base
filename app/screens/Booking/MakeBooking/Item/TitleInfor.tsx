import { StyleSheet, View, ViewStyle } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"

interface ItemProps {
  data: {
    title: string
    type: number
  }[]
  title: string
  styleStatus?: ViewStyle
}
export default function TitleInfor({ data, title, styleStatus }: ItemProps) {
  const STYLE_BY_TYPE = [styles.dotToday, styles.dotEmpty, styles.dotCancel]
  return (
    <View style={styles.container}>
      <Text weight="semiBold" size="xxxl" style={{ color: colors.gray_9 }}>
        {title}
      </Text>
      <View style={[styles.wrapperStatus, styleStatus]}>
        {data.map((item, index) => {
          return (
            <View style={styles.flexRow} key={index}>
              <View style={STYLE_BY_TYPE[item.type]} />
              <Text
                size="ba"
                weight="normal"
                style={{ marginLeft: WIDTH(8), color: colors.gray_7 }}
              >
                {item.title}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
  },
  dotCancel: {
    backgroundColor: colors.gray_3,
    borderRadius: WIDTH(16),
    height: WIDTH(16),
    width: WIDTH(16),
  },
  dotEmpty: {
    borderColor: colors.gray_3,
    borderRadius: WIDTH(16),
    borderWidth: 1,
    height: WIDTH(16),
    width: WIDTH(16),
  },
  dotToday: {
    borderColor: colors.primary,
    borderRadius: WIDTH(16),
    borderWidth: 1,
    height: WIDTH(16),
    width: WIDTH(16),
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  wrapperStatus: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: HEIGHT(spacing.md),
  },
})
