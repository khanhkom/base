import { FlatList, Keyboard, StyleSheet, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import SearchFilter from "@app/components/SearchFilter"
import ModalFilter from "./Item/ModalFilter"
import { useDispatch } from "react-redux"
import ItemQuestion from "./Item/ItemQuestion"
import { getListSpecialListRequest } from "@app/redux/actions/actionDoctor"
import usCallApiAlgoliaByIndex from "@app/screens/SearchHome/TabResults/Item/usCallApiAlgoliaByIndex"

export default function FrequentlyFAQ() {
  const filterData = useRef({
    specialist: "",
  })
  const dispatch = useDispatch()
  const [isFiltered, setFiltered] = useState(false)
  const [keyword, setKeyword] = useState("")
  // eslint-disable-next-line camelcase
  const refModal = useRef(null)
  const {
    listData,
    onFooterRefresh,
    onHeaderRefresh,
    refreshState,
    loading: loadingList,
  } = usCallApiAlgoliaByIndex(keyword, "faqs")

  console.log("listData_listData::", listData)

  useEffect(() => {
    dispatch(getListSpecialListRequest())
  }, [])

  const onApplyFilter = (dataFilter) => {
    filterData.current = dataFilter
    const params = {
      search: keyword,
      page: 1,
      perPage: 20,
    }
    if (dataFilter?.specialist !== "") {
      setFiltered(true)
    } else {
      setFiltered(false)
    }

    if (filterData.current?.specialist !== "") {
      Object.assign(params, {
        specialist: filterData.current?.specialist,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Header
        leftIcon="arrow_left"
        title={"Một số câu hỏi thường gặp"}
        backgroundColor={colors.white}
      />
      <SearchFilter
        value={keyword}
        isFiltered={isFiltered}
        onChangeText={(txt) => setKeyword(txt)}
        placeholder="Tìm kiếm"
        onPressFilter={() => {
          Keyboard.dismiss()
          refModal?.current?.show()
        }}
      />
      <FlatList
        data={[1, 2, 3]}
        renderItem={() => {
          return <ItemQuestion />
        }}
      />
      <ModalFilter
        speciallist={[]}
        onApply={onApplyFilter}
        filterData={filterData.current}
        ref={refModal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
  loading: { alignSelf: "center" },
})
