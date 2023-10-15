import { Pressable, StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import DatePicker from "react-native-date-picker"
import { TextField } from "@app/components/TextField"
import { Icon } from "@app/components/Icon"
import moment from "moment"
import { translate } from "@app/i18n/translate"
interface ItemProps {
  title: string
  onSelectDate: (val: Date) => void
  value: string
  status?: "error" | "disabled"
  helper?: string
}
export default function SelectBirthday({ title, onSelectDate, value, helper, status }: ItemProps) {
  const [date, setDate] = useState(new Date())
  const [isSeleted, setSeleted] = useState(false)
  useEffect(() => {
    if (value) setDate(new Date(value))
  }, [value])
  const [open, setOpen] = useState(false)

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
          helper={helper}
          status={status}
          placeholder="dd/mm/yyyy"
          style={{ color: colors.gray_9 }}
          value={isSeleted || value ? moment(value).format("DD/MM/YYYY") : ""}
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
          onSelectDate(date)
          if (!isSeleted) {
            setSeleted(true)
          }
        }}
        maximumDate={new Date()}
        mode="date"
        cancelText={translate("common.cancel")}
        confirmText={translate("common.ok")}
        title={translate("create_patient.select_birthday")}
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
