import { StyleSheet, View, Image, Pressable } from "react-native"
import React from "react"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button, Card } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
import { IPatient } from "@app/interface/patient"
interface ItemProps {
  onPress: () => void
  item: IPatient
}
export default function ItemRecord({ onPress, item }: ItemProps) {
  return (
    <Pressable
      style={styles.item}
      onPress={() => {
        onPress && onPress()
        console.log("AAAAAAA")
      }}
    >
      <Image source={R.images.avatar_patient} style={styles.avatar} resizeMode="center" />
      <View>
        <Text weight="medium" size="md" style={styles.textName}>
          {item?.name}
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Ngày sinh: <Text style={{ color: colors.gray_9 }}>{item?.birthday}</Text>
        </Text>
        <Text weight="normal" size="sm" style={styles.textDes}>
          Giới tính:{" "}
          <Text style={{ color: colors.gray_9 }}>{item?.gender === "male" ? "Nam" : "Nữ"}</Text>
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.white,
    marginTop: HEIGHT(spacing.sm),
    flexDirection: "row",
    paddingHorizontal: WIDTH(spacing.sm),
    borderRadius: 8,
  },
  avatar: {
    width: WIDTH(72),
    height: HEIGHT(72),
    alignSelf: "center",
    marginRight: WIDTH(spacing.sm),
  },
  textName: {
    color: colors.gray_9,
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(2),
  },
  textDes: { color: colors.gray_6, marginTop: 2 },
})
