import { StyleSheet, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import SearchFilter from "@app/components/SearchFilter"
import ItemDocter from "./Item/ItemDocter"
import { FlashList } from "@shopify/flash-list"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter from "./Item/ModalFilter"
import { getListDocter } from "@app/services/api/functions/docter"

export default function SearchDocter() {
  const [listDocters, setListDocters] = useState([])
  const [loading, setLoading] = useState(false)
  const refModal = useRef(null)
  const getListDoctersAPI = async () => {
    let params = {
      page: 1,
      perPage: 20,
    }
    setLoading(true)
    let resDocters = await getListDocter(params)
    setLoading(false)
    setListDocters(resDocters?.data?.items)
    console.log("resDocters", resDocters)
  }
  useEffect(() => {
    getListDoctersAPI()
  }, [])
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tư vấn ngay" backgroundColor={colors.white} />
      <SearchFilter
        onPressFilter={() => {
          refModal?.current?.show()
        }}
      />
      <FlashList
        data={listDocters}
        renderItem={({ item, index }) => {
          return <ItemDocter item={item} />
        }}
        ListFooterComponent={() => <View style={{ height: HEIGHT(spacing.lg) }} />}
      />
      <ModalFilter ref={refModal} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
