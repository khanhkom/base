import { Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import DateTimePicker from "@react-native-community/datetimepicker"
import DatePicker from "react-native-date-picker"
import { Button } from "react-native-paper"
import { TextField } from "@app/components/TextField"
import { Icon } from "@app/components/Icon"

export default function SelectBirthday() {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <View style={styles.container}>
      <Text preset="formLabel">
        Ngày sinh
        <Text preset="formLabel" style={{ color: colors.red_5 }}>
          *
        </Text>
      </Text>
      <Pressable
        onPress={() => {
          setOpen(true)
        }}
        style={{ marginTop: HEIGHT(spacing.xs) }}
      >
        <TextField
          placeholder="dd/mm/yyy"
          editable={false}
          RightAccessory={() => (
            <Icon
              icon="calendar"
              size={20}
              style={{ marginTop: HEIGHT(10), marginRight: WIDTH(12) }}
            />
          )}
        />
      </Pressable>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        mode="date"
        title="Chọn ngày sinh"
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: HEIGHT(spacing.md),
  },
})
