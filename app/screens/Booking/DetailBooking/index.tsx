import { StyleSheet, View, FlatList, Platform } from "react-native"
import React, { useState } from "react"
import colors from "@app/assets/colors"
import { Header, Icon, Screen, Text } from "@app/components/index"
import ItemBookInformation from "./Item/ItemBookInformation"
import BottonButton from "./Item/BottonButton"
import FileAttachment from "./Item/FileAttachment"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import useHookDetailBooking, { DATA_BOOK } from "./useHookDetailBooking"
import { STATUS_ORDER } from "@app/interface/order"
import { useSelector } from "@app/redux/reducers"
import ImageView from "react-native-image-viewing"
import { translate } from "@app/i18n/translate"
export default function DetailBooking({ route }) {
  const id = route?.params?.id
  const { detailOrder, loading, returnDataByField, getDetailOrderApi, updateDataCreateOrder } =
    useHookDetailBooking(id)
  const [visible, setIsVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const clientId = useSelector((state) => state.stringeeReducers.clientId)
  if (loading) return <LoadingScreen />
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ?["bottom"]:[]}
      contentContainerStyle={styles.container}
    >
      <Header
        leftIcon="arrow_left"
        title={translate("booking.detail_booking")}
        backgroundColor={colors.gray_1}
      />
      <FlatList
        data={DATA_BOOK}
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
        ListHeaderComponent={() => {
          if (detailOrder?.status === STATUS_ORDER.cancel)
            return (
              <List.Item
                style={{
                  backgroundColor: colors.red_6,
                  paddingLeft: WIDTH(spacing.md),
                  marginBottom: HEIGHT(spacing.md),
                }}
                left={() => {
                  return (
                    <View style={styles.wrapperIcon}>
                      <Icon icon="refresh" size={WIDTH(20)} color={colors.white} />
                    </View>
                  )
                }}
                title={() => {
                  return (
                    <Text size="ba" weight="normal" style={{ color: colors.white }}>
                      {translate("booking.cancel_reason")}: {detailOrder?.cancelDescription}
                    </Text>
                  )
                }}
              />
            )
          return <View style={{ height: HEIGHT(spacing.md) }} />
        }}
      />
      <ImageView
        images={(detailOrder?.fileUpload ?? [])?.map((item) => {
          return { uri: item }
        })}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <BottonButton
        status={detailOrder?.status}
        id={id}
        getDetailOrderApi={getDetailOrderApi}
        clientId={clientId}
        updateDataCreateOrder={updateDataCreateOrder}
        userId={detailOrder?.patient?.userId}
        to={detailOrder?.doctor?.userId}
        detailOrder={detailOrder}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
  wrapperIcon: { alignSelf: "center" },
})
