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
import { HEIGHT } from "@app/config/functions"
import RefreshList from "@app/components/refresh-list"
import ItemEmpty from "@app/components/ItemEmpty"
import R from "@app/assets"
export default function FrequentlyFAQ() {
  const filterData = useRef({
    specialist: "",
  })
  const dispatch = useDispatch()
  const [isFiltered, setFiltered] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [searchText, setSearchText] = useState("")

  // eslint-disable-next-line camelcase
  const refModal = useRef(null)
  const {
    listData,
    onFooterRefresh,
    onHeaderRefresh,
    refreshState,
    loading: loadingList,
  } = usCallApiAlgoliaByIndex(searchText, "faqs")

  console.log("listData_listData::", loadingList)
  useEffect(() => {
    let typingTimeout

    const handleSearch = () => {
      // Execute search logic here
      console.log("Search for:", searchText)
      setSearchText(keyword)
    }
    console.log("searchText", searchText)
    if (keyword !== searchText) {
      clearTimeout(typingTimeout)
      typingTimeout = setTimeout(handleSearch, 300)
    }

    return () => {
      clearTimeout(typingTimeout)
    }
  }, [keyword])
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

      <RefreshList
        data={listData}
        contentContainerStyle={{ paddingBottom: HEIGHT(32) }}
        loading={loadingList}
        onFooterRefresh={onFooterRefresh}
        onHeaderRefresh={onHeaderRefresh}
        showsVerticalScrollIndicator={false}
        refreshState={refreshState}
        renderItem={(item, index) => {
          return <ItemQuestion item={item} />
        }}
        ListEmptyComponent={() => {
          return (
            <ItemEmpty
              sourceImage={R.images.empty_chat}
              title="Không tìm thấy kết quả phù hợp"
              style={{
                marginTop: HEIGHT(230),
              }}
            />
          )
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
