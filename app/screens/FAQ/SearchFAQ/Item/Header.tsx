import { StyleSheet, View, TextInput } from "react-native"
import React from "react"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { useSafeAreaInsetsStyle } from "@app/utils/useSafeAreaInsetsStyle"
import { Icon } from "@app/components/Icon"
import { goBack } from "@app/navigators/navigationUtilities"
export default function Header({ keyword, setKeyword, onSubmitSearch }) {
  const $containerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <View style={[styles.container, $containerInsets]}>
      <Icon icon="arrow_left" size={WIDTH(32)} color={colors.white} onPress={goBack} />
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        style={styles.textInput}
        placeholder="Tìm kiếm vấn đề của bạn"
        placeholderTextColor={colors.gray_5}
        onSubmitEditing={onSubmitSearch}
        autoFocus={true}
      />
      {keyword !== "" && (
        <Icon onPress={() => setKeyword("")} icon="x_close" size={WIDTH(16)} style={styles.close} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: HEIGHT(10),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textInput: {
    width: WIDTH(303),
    backgroundColor: colors.white,
    borderRadius: 8,
    marginLeft: WIDTH(spacing.sm),
    marginTop: HEIGHT(spacing.xs),
    paddingHorizontal: WIDTH(spacing.sm),
    color: colors.gray_9,
    minHeight: HEIGHT(44),
  },
  close: {
    position: "absolute",
    right: WIDTH(spacing.xs),
    bottom: -HEIGHT(spacing.sm),
  },
})
