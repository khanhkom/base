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
interface ItemProps {
  title: string
  placeholder: string
}
export default function LocationPicker({ title, placeholder }: ItemProps) {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <View style={styles.container}>
      <Text preset="formLabel">{title}</Text>
      <Pressable
        onPress={() => {
          setOpen(true)
        }}
        style={{ marginTop: HEIGHT(spacing.xs) }}
      >
        <TextField
          placeholder={placeholder}
          placeholderTextColor={colors.gray_9}
          value={!isToday(date) ? moment(date).format("DD/MM/YYYY") : ""}
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
      <ModalAdress visible={open} setVisible={setOpen} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.md),
  },
})
