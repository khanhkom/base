import { FlatList, Keyboard, StyleSheet, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import SearchFilter from "@app/components/SearchFilter"
import ModalFilter from "./Item/ModalFilter"
import { getListDocter } from "@app/services/api/functions/docter"
import { useDispatch } from "react-redux"
import { translate } from "@app/i18n/translate"
import ItemQuestion from "./Item/ItemQuestion"
import { getListSpecialListRequest } from "@app/redux/actions/actionDoctor"

export default function FrequentlyFAQ() {
  const [listDocters, setListDocters] = useState([])
  const filterData = useRef({
    specialist: "",
    gender: "",
    sortByRatings: 0,
  })
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [isFiltered, setFiltered] = useState(false)
  const [keyword, setKeyword] = useState("")
  // eslint-disable-next-line camelcase
  const refModal = useRef(null)

  const getListDoctersAPI = async (params) => {
    setLoading(true)
    const resDocters = await getListDocter(params)
    setLoading(false)
    setListDocters(resDocters?.data?.items)
  }
  let timerId

  useEffect(() => {
    dispatch(getListSpecialListRequest())
  }, [])
  useEffect(() => {
    bounceToSearch()
  }, [keyword])

  function bounceToSearch() {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      // Code to trigger the search
      onApplyFilter(filterData.current)
    }, 300)
  }
  const onApplyFilter = (dataFilter) => {
    filterData.current = dataFilter
    const params = {
      search: keyword,
      page: 1,
      perPage: 20,
    }
    if (
      dataFilter?.gender !== "" ||
      dataFilter?.specialist !== "" ||
      dataFilter?.sortByRatings !== 0
    ) {
      setFiltered(true)
    } else {
      setFiltered(false)
    }
    if (filterData.current?.gender !== "") {
      Object.assign(params, {
        gender: filterData.current?.gender,
      })
    }
    if (filterData.current?.specialist !== "") {
      Object.assign(params, {
        specialist: filterData.current?.specialist,
      })
    }
    if (filterData.current?.sortByRatings !== 0) {
      Object.assign(params, {
        sortByRatings: filterData.current?.sortByRatings,
      })
    }
    getListDoctersAPI(params)
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
