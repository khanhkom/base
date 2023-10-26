import { ActivityIndicator, FlatList, Keyboard, StyleSheet, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { Header } from "@app/components/index"
import colors from "@app/assets/colors"
import SearchFilter from "@app/components/SearchFilter"
import ItemDocter from "./Item/ItemDocter"
import { HEIGHT } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ModalFilter from "./Item/ModalFilter"
import { getListDocter } from "@app/services/api/functions/docter"
import { ISpecialList } from "@app/interface/docter"
import ItemEmpty from "@app/components/ItemEmpty"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { resetOrderInfor, updateDocterCreateOrder } from "@app/redux/actions/actionOrder"
import { translate } from "@app/i18n/translate"

interface ScreenProps {
  route: {
    params: {
      speciallist: ISpecialList
      preScreen?: string | "SelectSpecialist"
    }
  }
}
export default function SearchDocter({ route }: ScreenProps) {
  const [listDocters, setListDocters] = useState([])
  const filterData = useRef({
    specialist: "",
    gender: "",
    sortByRatings: 0,
  })
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
  const onPressItem = (item) => {
    navigate("DocterInformation", {
      item,
      preScreen: route?.params?.preScreen,
    })
  }
  const dispatch = useDispatch()
  const onPressBook = (item) => {
    dispatch(updateDocterCreateOrder(item))

    if (route?.params?.preScreen === "SelectSpecialist") {
      navigate("SelectCalendar")
    } else if (route?.params?.preScreen) {
      goBack()
    } else {
      // reset data when user back to this screen
      navigate("SelectCalendar")
      dispatch(resetOrderInfor())
    }
  }
  return (
    <View style={styles.container}>
      <Header
        leftIcon="arrow_left"
        title={translate("booking.booking")}
        backgroundColor={colors.white}
      />
      <SearchFilter
        value={keyword}
        isFiltered={isFiltered}
        onChangeText={(txt) => setKeyword(txt)}
        onPressFilter={() => {
          Keyboard.dismiss()
          refModal?.current?.show()
        }}
      />
      {loading ? (
        <ActivityIndicator size={"small"} color={colors.gray_4} style={styles.loading} />
      ) : (
        <FlatList
          data={listDocters}
          extraData={listDocters}
          renderItem={({ item }) => {
            return (
              <ItemDocter
                item={item}
                onPress={() => onPressItem(item)}
                onPressBook={() => onPressBook(item)}
              />
            )
          }}
          ListEmptyComponent={() => {
            return <ItemEmpty title={translate("common.empty_search")} />
          }}
          ListFooterComponent={() => <View style={{ height: HEIGHT(spacing.lg) }} />}
        />
      )}
      <ModalFilter
        speciallist={route?.params?.speciallist}
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
