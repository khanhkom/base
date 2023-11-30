import { ActivityIndicator, FlatList, Keyboard, StyleSheet, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import { translate } from "@app/i18n/translate"
import SearchFilter from "./Item/SearchFilter"
import LastQuestion from "./Item/LastQuestion"
import ItemSpecialList from "./Item/ItemSpecialList"
import { Button } from "react-native-paper"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemFrequently from "./Item/ItemFrequently"

interface ScreenProps {
  route: {
    params: {}
  }
}
export default function CommunityFAQ({ route }: ScreenProps) {
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState("")

  return (
    <View style={styles.container}>
      <Header
        leftIcon="arrow_left"
        title={"Hỏi đáp cộng đồng"}
        backgroundColor={colors.primary}
        titleStyle={{ color: colors.white }}
        leftIconColor={colors.white}
      />
      <SearchFilter
        value={keyword}
        onChangeText={(txt) => setKeyword(txt)}
        onPressFilter={() => {
          Keyboard.dismiss()
          navigate("MyQuestion")
        }}
      />
      <ItemFrequently />
      <LastQuestion />
      <ItemSpecialList />
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            navigate("SendQuestion")
          }}
        >
          Đặt câu hỏi
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
  loading: { alignSelf: "center" },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: getWidth(),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.md),
  },
  button: {
    borderRadius: 8,
  },
})
