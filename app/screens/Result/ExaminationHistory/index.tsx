import { StyleSheet, View, FlatList } from "react-native"
import React, { useEffect } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import ItemHistory from "./Item/ItemHistory"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemEmpty from "./Item/ItemEmpty"
import useHookExam from "./useHookExam"
import LoadingScreen from "@app/components/loading/LoadingScreen"
interface IScreenProps {
  route: {
    params: {
      id: string
    }
  }
}
export default function ExaminationHistory({ route }: IScreenProps) {
  const { loading, getAllResulsCall, listResults } = useHookExam(route?.params?.id)
  useEffect(() => {
    getAllResulsCall()
  }, [])
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Lịch sử khám" backgroundColor={colors.gray_1} />
      {/* <ItemEmpty /> */}
      <FlatList
        data={listResults}
        renderItem={({ item, index }) => {
          return (
            <ItemHistory
              index={index}
              onPress={() => {
                navigate("DetailExamination", { id: item?.id, specialist: { value: "Test" } })
              }}
            />
          )
        }}
        ListEmptyComponent={() => <ItemEmpty />}
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
