import { StyleSheet, View, FlatList } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header, Icon, Text } from "@app/components/index"
import ItemBookInformation from "./Item/ItemBookInformation"
import BottonButton from "./Item/BottonButton"
import FileAttachment from "./Item/FileAttachment"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import useHookDetailBooking, { DATA_BOOK } from "./useHookDetailBooking"
import { STATUS_ORDER } from "@app/interface/order"
export default function DetailBooking({ route }) {
  const id = route?.params?.id
  const { detailOrder, loading, returnDataByField, getDetailOrderApi } = useHookDetailBooking(id)

  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chi tiết lịch khám" backgroundColor={colors.gray_1} />
      <FlatList
        data={DATA_BOOK}
        renderItem={({ item, index }) => {
          return <ItemBookInformation item={item} returnDataByField={returnDataByField} />
        }}
        ListFooterComponent={() => <FileAttachment data={detailOrder?.fileUpload ?? []} />}
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
                    <View style={{ alignSelf: "center" }}>
                      <Icon icon="refresh" size={WIDTH(20)} color={colors.white} />
                    </View>
                  )
                }}
                title={() => {
                  return (
                    <Text size="ba" weight="normal" style={{ color: colors.white }}>
                      Lý do hủy: {detailOrder?.cancelDescription}
                    </Text>
                  )
                }}
              />
            )
          return <View style={{ height: HEIGHT(spacing.md) }} />
        }}
      />
      <BottonButton status={detailOrder?.status} id={id} getDetailOrderApi={getDetailOrderApi} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
