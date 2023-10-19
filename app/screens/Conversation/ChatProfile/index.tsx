import { StyleSheet, View, Image } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/Header"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button } from "react-native-paper"
export default function ChatProfile() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Thông tin bác sĩ" backgroundColor={colors.white} />
      <View style={styles.body}>
        <Image source={R.images.background_profile} style={styles.backgroundImage} />
        <Image
          source={R.images.avatar_docter_rec}
          style={styles.doctorImage}
          resizeMode="contain"
        />
        <Text
          size="xxl"
          weight="semiBold"
          style={{ color: colors.gray_9, marginBottom: HEIGHT(spacing.xxs) }}
        >
          B.s Nguyễn Văn A
        </Text>
        <Text
          size="ba"
          weight="normal"
          style={{ color: colors.gray_7, marginBottom: HEIGHT(spacing.xxs) }}
        >
          Khoa: Tai - Mũi Họng
        </Text>
        <Text
          size="ba"
          weight="normal"
          style={{ color: colors.gray_7, marginBottom: HEIGHT(spacing.xxs) }}
        >
          Trình độ: Bác sĩ nội trú
        </Text>
      </View>
      <Button mode="contained" style={styles.button}>
        Xem thông tin bác sĩ
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    width: "100%",
    alignItems: "center",
    flex: 1,
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
  button: {
    marginTop: HEIGHT(28),
    borderRadius: 8,
    marginHorizontal: WIDTH(spacing.md),
    marginBottom: HEIGHT(spacing.md),
    backgroundColor: colors.primary,
  },
})
