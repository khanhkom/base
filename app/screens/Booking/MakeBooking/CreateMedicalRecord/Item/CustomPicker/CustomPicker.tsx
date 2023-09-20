import { Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import { Icon } from "@app/components/Icon"
interface ItemProps {
  title: string
  placeholder: string
  required?: boolean
  value: string
  setValue: (val: string) => void
  onPress: () => void
}
export default function CustomPicker({ title, placeholder, required, value, onPress }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text preset="formLabel">
        {title} {required && <Text style={{ color: colors.red_5 }}>*</Text>}
      </Text>
      <Pressable
        onPress={() => {
          onPress()
        }}
        style={{ marginTop: HEIGHT(spacing.xs) }}
      >
        <TextField
          placeholder={placeholder}
          placeholderTextColor={colors.gray_9}
          value={value}
          style={{ color: colors.gray_9 }}
          editable={false}
          RightAccessory={() => (
            <Icon
              icon="arrow_right"
              size={20}
              style={{ marginTop: HEIGHT(10), marginRight: WIDTH(12) }}
            />
          )}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.md),
  },
})
