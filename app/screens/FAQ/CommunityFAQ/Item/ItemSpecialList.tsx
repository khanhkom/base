import { Image, Pressable, StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
import { List } from "react-native-paper"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { navigate } from "@app/navigators/navigationUtilities"
import { getListQuestionSpecialList } from "@app/services/api/functions/question"
import { useSelector } from "@app/redux/reducers"
export default function ItemSpecialList() {
  const [specialListMost, setSpecialListMode] = useState([])
  const user = useSelector((state) => state.userReducers.user)
  const specialist = useSelector((state) => state.orderReducers.specialist)
  console.log("user_user", specialist)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function getMost() {
      setLoading(true)
      const specialList = await getListQuestionSpecialList()
      console.log("specialList::", specialList?.data)
      setLoading(false)
    }
    getMost()
  }, [])
  return (
    <View style={styles.container}>
      <List.Item
        title={() => {
          return (
            <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
              Chuyên khoa nổi bật
            </Text>
          )
        }}
      />
      <View style={styles.flexRow}>
        <Pressable
          onPress={() => {
            navigate("ListQuestion")
          }}
          style={styles.item}
        >
          <Image source={R.images.features_2} style={styles.icon} />
          <Text size="ba" weight="medium" style={styles.textName}>
            Nhi khoa
          </Text>
          <Text size="sm" weight="normal" style={{ color: colors.primary_8 }}>
            2300 câu hỏi
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigate("ListQuestion")
          }}
          style={styles.item}
        >
          <Image source={R.images.features_1} style={styles.icon} />
          <Text size="ba" weight="medium" style={styles.textName}>
            Răng - Hàm - Mặt
          </Text>
          <Text size="sm" weight="normal" style={{ color: colors.primary_8 }}>
            2300 câu hỏi
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.sm),
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
  },
  textName: {
    color: colors.gray_9,
    marginTop: HEIGHT(spacing.xs),
    marginBottom: HEIGHT(spacing.xxs),
  },
  icon: {
    width: WIDTH(48),
    height: WIDTH(48),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: WIDTH(166),
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "center",
    alignItems: "center",
  },
})
