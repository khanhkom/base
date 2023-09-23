import { Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import DatePicker from "react-native-date-picker"
import { TextField } from "@app/components/TextField"
import { Icon } from "@app/components/Icon"
import moment from "moment"
import { isToday } from "date-fns"
interface ItemProps {
  title: string
  onChangeDate: (val: Date) => void
  minDate?: Date
  date: Date
}
export default function ItemDatePicker({ title, onChangeDate, minDate, date }: ItemProps) {
  const [open, setOpen] = useState(false)
  const [isEdited, setEdited] = useState(false)
  return (
    <View style={styles.container}>
      <Text preset="formLabel">
        {title || "Ngày sinh"}
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
          placeholder="dd/mm/yyyy"
          style={{ color: colors.gray_9 }}
          value={isEdited || date ? moment(date).format("DD/MM/YYYY") : ""}
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
          onChangeDate(date)
          if (!isEdited) {
            setEdited(true)
          }
        }}
        minimumDate={minDate}
        confirmText="Đồng ý"
        cancelText="Hủy"
        mode="date"
        title="Chọn ngày"
        onCancel={() => {
          setOpen(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.md),
    marginHorizontal: WIDTH(spacing.xl),
  },
})
