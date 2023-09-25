import { StyleSheet, Image, View, FlatList } from "react-native"
import React, { useEffect } from "react"
import colors from "@app/assets/colors"
import { Header, Icon } from "@app/components/index"
import { navigate } from "@app/navigators/navigationUtilities"
import Banner from "./Item/Banner"
import BottonButton from "./Item/BottonButton"
import { HEIGHT } from "@app/config/functions"
import useHookDetailBooking, { DATA_BOOK } from "../DetailBooking/useHookDetailBooking"
import ItemBookInformation from "../DetailBooking/Item/ItemBookInformation"
import FileAttachment from "../DetailBooking/Item/FileAttachment"
import LoadingScreen from "@app/components/loading/LoadingScreen"

interface ScreenProps {
  route: {
    params: {
      id: string
    }
  }
}
export default function BookingSuccess({ route }: ScreenProps) {
  const { detailOrder, loading, returnDataByField, getDetailOrderApi } = useHookDetailBooking(
    route?.params?.id,
  )
  console.log("id", route?.params?.id)
  useEffect(() => {
    getDetailOrderApi()
  }, [])
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Đặt lịch khám thành công" />

      <FlatList
        data={DATA_BOOK}
        ListHeaderComponent={() => <Banner />}
        renderItem={({ item, index }) => {
          return <ItemBookInformation item={item} returnDataByField={returnDataByField} />
        }}
        ListFooterComponent={() => <FileAttachment data={detailOrder?.fileUpload ?? []} />}
      />
      <BottonButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
