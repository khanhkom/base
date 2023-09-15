import React from "react"
import { View, StyleSheet, ViewStyle, StyleProp, TextStyle, ActivityIndicator } from "react-native"
import { HEIGHT } from "@app/config/functions"
import { Text } from "@app/components/index"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"

type ItemProps = {
  styleLoading?: StyleProp<ViewStyle>
  top?: number
  styleText?: StyleProp<TextStyle>
  testID?: string
}

export const LoadingOpacity = ({ styleLoading, top, styleText, testID }: ItemProps) => {
  return (
    <View testID={testID} style={styles.loading}>
      <View
        style={[
          {
            paddingTop: top || HEIGHT(30),
            alignItems: "center",
            justifyContent: "center",
          },
          styleLoading,
        ]}
      >
        <ActivityIndicator size={24} color={colors.white} />
        <Text
          size="ba"
          weight="normal"
          style={[
            {
              marginTop: HEIGHT(spacing.xxs),
              marginHorizontal: HEIGHT(spacing.xxs),
              color: colors.white,
            },
            styleText,
          ]}
        >
          Loading...
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.backdrop,
  },
})
