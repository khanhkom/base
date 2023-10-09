import { StyleSheet, View, FlatList } from "react-native"
import React, { useEffect } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import useHookExam from "./useHookExam"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import ItemEmpty from "@app/components/ItemEmpty"
import { HEIGHT } from "@app/config/functions"
import ItemHistory from "@app/screens/Result/ExaminationHistory/Item/ItemHistory"

export default function ExaminationHistory() {
  const { loading, getAllResulsCall, listResults } = useHookExam()
  useEffect(() => {
    getAllResulsCall()
  }, [])
  console.log("listResults_listResults", listResults)
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Kết quả khám" backgroundColor={colors.gray_1} />
      {/* <ItemEmpty /> */}
      <FlatList
        data={listResults}
        renderItem={({ item, index }) => {
          return (
            <ItemHistory
              index={index}
              onPress={() => {
                navigate("DetailExamination")
              }}
            />
          )
        }}
        ListEmptyComponent={() => (
          <ItemEmpty style={{ marginTop: HEIGHT(100) }} title="Bạn chưa có kết quả khám nào" />
        )}
        ListFooterComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
