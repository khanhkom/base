import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import R from "@app/assets"
import { useSafeAreaInsetsStyle } from "@app/utils/useSafeAreaInsetsStyle"
import { useSelector } from "@app/redux/reducers"
export default function Header() {
  const $containerInsets = useSafeAreaInsetsStyle(["top"])
  const user = useSelector((state) => state.userReducers.user)
  const patients = useSelector((state) => state.patientReducers.patients)

  console.log("user::", patients)
  const avatar = patients?.[0]?.avatarUrl
  return (
    <View style={[styles.container, $containerInsets]}>
      <Image source={R.images.background_profile} style={styles.backgroundImage} />
      <Image
        source={avatar ? { uri: avatar } : R.images.avatar_patient}
        style={styles.doctorImage}
        resizeMode="cover"
      />
      <Text
        size="xxl"
        weight="semiBold"
        style={{ color: colors.white, marginBottom: HEIGHT(spacing.xxs) }}
      >
        {user?.fullname ?? "Chưa cập nhật"}
      </Text>
      <Text
        size="ba"
        weight="normal"
        style={{ color: colors.white, marginBottom: HEIGHT(spacing.xxs) }}
      >
        {user?.phone}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: HEIGHT(spacing.xxl),
    justifyContent: "center",
    alignItems: "center",
  },
  doctorImage: {
    height: WIDTH(148),
    width: WIDTH(111),
    borderRadius: WIDTH(12),
    marginBottom: HEIGHT(spacing.md),
    marginTop: HEIGHT(spacing.xxl),
  },

  backgroundImage: {
    height: "100%",
    width: getWidth(),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
})
