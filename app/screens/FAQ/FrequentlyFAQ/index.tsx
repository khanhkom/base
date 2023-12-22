import { FlatList, Keyboard, StyleSheet, View } from "react-native"
import React, { useEffect, useMemo, useRef, useState } from "react"
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
import ItemPlaceholder from "@app/components/ItemPlaceholder"
export default function FrequentlyFAQ() {
  const dispatch = useDispatch()
  const [isFiltered, setFiltered] = useState(false)
  const [keyword, setKeyword] = useState("")
  const [searchText, setSearchText] = useState("")
  const [facetFilters, setFacetFilters] = useState([])

  // eslint-disable-next-line camelcase
  const facetFiltersMap = useMemo(() => {
    return facetFilters?.map((it) => `specialistCode:${it?.specialistCode}`)
  }, [facetFilters])
  const refModal = useRef(null)
  const {
    listData,
    onFooterRefresh,
    onHeaderRefresh,
    refreshState,
    loading: loadingList,
  } = usCallApiAlgoliaByIndex(searchText, "faqs", facetFiltersMap)

  console.log("listData_listData::", facetFiltersMap)
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
    setFacetFilters(dataFilter)
    console.log("dataFilter", dataFilter)
    if (dataFilter?.length > 0) {
      setFiltered(true)
    } else {
      setFiltered(false)
    }
  }
  console.log("listData", facetFilters)
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
      {loadingList ? (
        <View>
          <ItemPlaceholder />
          <ItemPlaceholder />
          <ItemPlaceholder />
        </View>
      ) : (
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
      )}
      <ModalFilter onApply={onApplyFilter} filterData={facetFilters} ref={refModal} />
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
