import { StyleSheet, View, Image, Pressable } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { IPatient } from "@app/interface/patient"
import { translate } from "@app/i18n/translate"
interface ItemProps {
  onPress: () => void
  item: IPatient
}
export default function ItemRecord({ onPress, item }: ItemProps) {
  const isMale = item?.gender === "male"
  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        onPress && onPress()
      }}
    >
      <Image
        source={isMale ? R.images.patient_male : R.images.patient_female}
        style={styles.avatar}
        resizeMode='contain'
      />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          {item?.name}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          {translate("create_patient.date_of_birth")}:{" "}
          <Text style={{ color: colors.gray_9 }}>{item?.birthday}</Text>
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          {translate("create_patient.gender")}:{" "}
          <Text style={{ color: colors.gray_9 }}>{isMale ? "Nam" : "Nữ"}</Text>
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  avatar: {
    height: HEIGHT(32),
    marginRight: WIDTH(spacing.sm),
    width: WIDTH(32),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: "row",
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },
  textDes: { color: colors.gray_6, marginTop: 2 },
  textName: {
    color: colors.gray_9,
    marginBottom: HEIGHT(2),
  },
})
