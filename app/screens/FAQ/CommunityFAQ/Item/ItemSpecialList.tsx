import { FlatList, Image, Pressable, StyleSheet, View } from "react-native"
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
import { ISpecialistMost } from "@app/interface/question"
import ItemEmpty from "@app/components/ItemEmpty"
export default function ItemSpecialList() {
  const [specialListMost, setSpecialListMode] = useState<ISpecialistMost[]>([])
  const [loading, setLoading] = useState(true)
  const isReload = useSelector((state) => state.questionReducers.isReload)
  useEffect(() => {
    async function getMost() {
      setLoading(true)
      const specialList = await getListQuestionSpecialList()
      console.log("specialList::", specialList?.data)
      setSpecialListMode(specialList?.data ?? [])
      setLoading(false)
    }
    getMost()
  }, [isReload])
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
      <FlatList
        data={specialListMost}
        numColumns={2}
        style={styles.flatList}
        ListEmptyComponent={() => {
          return <ItemEmpty title="Chưa có dữ liệu." />
        }}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                navigate("ListQuestion", {
                  query: {
                    specialistCode: item?.specialist?.code,
                  },
                })
              }}
              style={[styles.item, index % 2 === 0 && { marginRight: WIDTH(spacing.sm) }]}
            >
              <Image source={{ uri: item?.iconUrl }} style={styles.icon} />
              <Text size="ba" weight="medium" style={styles.textName}>
                {item?.specialist?.value ?? ""}
              </Text>
              <Text size="sm" weight="normal" style={{ color: colors.primary_8 }}>
                {item?.count} câu hỏi
              </Text>
            </Pressable>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.sm),
    paddingBottom: HEIGHT(100),
  },
  flatList: {
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
    marginBottom: HEIGHT(spacing.sm),
  },
})
