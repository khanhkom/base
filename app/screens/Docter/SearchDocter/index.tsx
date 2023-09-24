import { Keyboard, StyleSheet, View } from "react-native"
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
import { useFocusEffect } from "@react-navigation/native"
const TYPE_SEARCH = {
  SORT_RATING: 2,
  GENDER: 1,
  SPECIALIST: 0,
}
const LIST_SPECIALIST = ["Tất cả", "Nhi khoa", "Tai mũi họng"]
const GENDER = ["Nam", "Nữ"]
const SORTBY = ["Đánh giá từ cao đến thấp", "Đánh giá từ thấp đến cao"]
const DATA_SESSION = [
  {
    title: "Chuyên khoa",
    data: LIST_SPECIALIST,
    isIndex: 0,
  },
  {
    title: "Giới tính",
    data: GENDER,
    isIndex: 0,
  },
  {
    title: "Sắp xếp theo",
    data: SORTBY,
    isIndex: 0,
  },
]
const LIST_SPECIALIST_DATA = ["001", "002", "003"]
export default function SearchDocter() {
  const [listDocters, setListDocters] = useState([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [isFilter, setIsFilter] = useState(false)
  // eslint-disable-next-line camelcase
  const [dataFilter, setDataFilter] = useState(DATA_SESSION)
  const refModal = useRef(null)
  const returnValueParams = (value, type) => {
    let specialist = ""
    let gender = ""
    let sort_byrating = null
    if (isFilter) {
      switch (type) {
        case TYPE_SEARCH.SPECIALIST:
          specialist = value ? LIST_SPECIALIST_DATA[value.isIndex] : null
          return { specialist }
        case TYPE_SEARCH.SORT_RATING:
          sort_byrating = value ? (value.isIndex === 0 ? -1 : 1) : null
          return { sort_byrating }
        case TYPE_SEARCH.GENDER:
          gender = value ? (value.isIndex === 0 ? "male" : "fe_male") : null
          return { gender }
        default:
          break
      }
    } else {
      return { specialist: "", sort_byrating: "", gender: "" }
    }
  }
  const getListDoctersAPI = async (params) => {
    setLoading(true)
    const resDocters = await getListDocter(params)
    setLoading(false)
    setListDocters(resDocters?.data?.items)
  }
  const onSearch = async () => {
    const params = {
      specialist: returnValueParams(dataFilter[TYPE_SEARCH.SPECIALIST], TYPE_SEARCH.SPECIALIST)
        .specialist,
      sortByRatings: returnValueParams(dataFilter[TYPE_SEARCH.SORT_RATING], TYPE_SEARCH.SORT_RATING)
        .sort_byrating,
      gender: returnValueParams(dataFilter[TYPE_SEARCH.GENDER], TYPE_SEARCH.GENDER).gender,
      search: keyword,
      page: 1,
      perPage: 20,
    }
    getListDoctersAPI(params)
  }
  const selectItem = (index, indx) => {
    dataFilter[index].isIndex = indx
    setDataFilter(dataFilter)
  }
  useFocusEffect(
    React.useCallback(() => {
      const params = {
        page: 1,
        perPage: 20,
      }
      setDataFilter(DATA_SESSION)
      getListDoctersAPI(params)
    }, [dataFilter]),
  )

  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tư vấn ngay" backgroundColor={colors.white} />
      <SearchFilter
        value={keyword}
        onChangeText={(txt) => setKeyword(txt)}
        onIconPress={onSearch}
        onPressFilter={() => {
          setIsFilter(true)
          Keyboard.dismiss()
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

      <ModalFilter onApply={onSearch} selectItem={selectItem} data={dataFilter} ref={refModal} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
