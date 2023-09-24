import { StyleSheet, Image, View, ImageBackground } from "react-native"
import React, { useState } from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import { spacing } from "@app/theme/spacing"
import { Searchbar } from "react-native-paper"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
type HeaderHomeProps = {
  onSearch?: (keyword: string) => void
}
export default function HeaderHome(props: HeaderHomeProps) {
  const { onSearch } = props
  const [keyword, setKeyword] = useState("")
  return (
    <View style={styles.imageBGR} resizeMode="contain">
      <View style={styles.bgr} />
      <View style={styles.flexRow}>
        <Image source={R.images.heart} style={styles.icHeart} />
        <Image source={R.images.textsdocter} style={styles.logoText} resizeMode="contain" />
        <Icon
          icon="ic_noti"
          style={styles.icBard}
          onPress={() => {
            navigate("Notification")
          }}
        />
      </View>
      <Searchbar
        onClearIconPress={() => setKeyword("")}
        value={keyword}
        icon={R.images.search_normal}
        style={styles.searchBar}
        iconColor={colors.white}
        placeholderTextColor={colors.primary_2}
        placeholder="Tìm kiếm"
        onChangeText={(txt) => setKeyword(txt)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(spacing.xxs),
  },
  icHeart: {
    width: WIDTH(56),
    height: WIDTH(56),
  },
  icBard: {
    width: WIDTH(24),
    height: WIDTH(24),
  },
  logoText: {
    width: WIDTH(90),
    height: HEIGHT(40),
  },
  imageBGR: {
    height: HEIGHT(320),
    width: "100%",
    marginTop: -HEIGHT(30),
    paddingTop: HEIGHT(60),
  },
  searchBar: {
    borderRadius: 8,
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(20),
    backgroundColor: colors.white_1,
  },
  bgr: {
    position: "absolute",
    height: HEIGHT(1000),
    top: -HEIGHT(680),
    left: "-50%",
    width: "200%",
    backgroundColor: colors.primary,
    borderRadius: 250,
    // transform: [{ rotate: "20deg" }],
  },
})
