import { StyleSheet, Image, View } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header, Icon } from "@app/components/index"
import { List } from "react-native-paper"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { navigate } from "@app/navigators/navigationUtilities"

export default function CousultOnline() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tư vấn trực tuyến" backgroundColor={colors.gray_1} />
      <List.Item
        title="Tư vấn ngay"
        style={styles.item}
        onPress={() => {
          navigate("SearchDocter")
        }}
        left={() => {
          return <Image source={R.images.ic_tuvanngay} style={styles.icon} resizeMode="contain" />
        }}
        right={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              <Icon icon="arrow_right" size={20} />
            </View>
          )
        }}
      />
      <List.Item
        title="Đặt lịch hẹn"
        style={styles.item}
        onPress={() => {
          navigate("SelectPatientRecord")
        }}
        left={() => {
          return <Image source={R.images.ic_datlichhen} style={styles.icon} resizeMode="contain" />
        }}
        right={() => {
          return (
            <View style={{ alignSelf: "center" }}>
              <Icon icon="arrow_right" size={20} />
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.white,
    borderRadius: WIDTH(8),
    paddingLeft: WIDTH(spacing.sm),
    marginTop: HEIGHT(spacing.sm),
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
  icon: {
    height: WIDTH(32),
    width: WIDTH(32),
  },
})
