import { StyleSheet, View, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import colors from "@app/assets/colors"
import { Header } from "@app/components/index"
import Banner from "./Item/Banner"
import BottonButton from "./Item/BottonButton"
import useHookDetailBooking, { DATA_BOOK } from "../DetailBooking/useHookDetailBooking"
import ItemBookInformation from "../DetailBooking/Item/ItemBookInformation"
import FileAttachment from "../DetailBooking/Item/FileAttachment"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import ImageView from "react-native-image-viewing"

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
  const [visible, setIsVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  console.log("id", route?.params?.id)
  useEffect(() => {
    getDetailOrderApi()
  }, [])
  console.log("detailOrder", detailOrder?.fileUpload)
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
        ListFooterComponent={() => (
          <FileAttachment
            data={detailOrder?.fileUpload ?? []}
            onPress={(index) => {
              setImageIndex(index)
              setIsVisible(true)
            }}
          />
        )}
      />
      <ImageView
        images={(detailOrder?.fileUpload ?? [])?.map((item) => {
          return { uri: item }
        })}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
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
