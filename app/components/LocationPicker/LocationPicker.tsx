import { Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import { Icon } from "@app/components/Icon"
import moment from "moment"
import { isToday } from "date-fns"
import ModalAdress from "./ModalAdress"
import { navigate } from "@app/navigators/navigationUtilities"
import { EToastType, showToastMessage } from "@app/utils/library"
interface ItemProps {
  title: string
  placeholder: string
  value: {
    name: string
    _id: string
  }
  type: "wards" | "districts" | "provinces"
  setValue: (val) => void
  parentId: string
}
export default function LocationPicker({
  title,
  placeholder,
  value,
  parentId,
  setValue,
  type,
}: ItemProps) {
  return (
    <View style={styles.container}>
      <Text preset="formLabel">{title}</Text>
      <Pressable
        onPress={() => {
          if (parentId === "" && type !== "provinces") {
            if (type === "districts")
              showToastMessage("Vui lòng chọn Tỉnh/Thành phố!", EToastType.ERROR)
            else if (type === "wards")
              showToastMessage("Vui lòng chọn Quận/Huyện!", EToastType.ERROR)
          } else {
            navigate("SelectLocation", {
              type,
              value,
              setValue,
              parentId,
            })
          }
        }}
        style={{ marginTop: HEIGHT(spacing.xs) }}
      >
        <TextField
          placeholder={placeholder}
          placeholderTextColor={colors.gray_9}
          value={value?.name}
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
