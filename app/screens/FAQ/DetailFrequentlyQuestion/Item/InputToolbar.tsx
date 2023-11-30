import { StyleSheet, TextInput, View } from "react-native"
import React from "react"
import { GiftedChat, InputToolbar } from "react-native-gifted-chat"
import { Icon } from "@app/components/Icon"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"

export default function ItemInputToolbar() {
  return (
    <InputToolbar
      primaryStyle={styles.primaryStyle}
      renderSend={() => {
        return <Icon icon="send" size={WIDTH(28)} />
      }}
      renderComposer={() => {
        return (
          <View style={styles.wrapperIcon}>
            <TextInput
              placeholder="Gửi tin nhắn"
              placeholderTextColor={colors.gray_6}
              style={styles.textInput}
            />
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  wrapperIcon: {
    width: WIDTH(303),
    backgroundColor: colors.gray_2,
    borderRadius: 100,
  },
  textInput: {
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.xs),
  },
  primaryStyle: {
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopWidth: 0,
  },
})
