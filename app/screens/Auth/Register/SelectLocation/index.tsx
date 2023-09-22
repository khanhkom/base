import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import Modal from "react-native-modal"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { Divider, List, Searchbar } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Header } from "@app/components/Header"
import {
  getDistrictByProvince,
  getProvincesByPage,
  getWardsByDistrict,
} from "@app/services/api/functions/location"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { goBack } from "@app/navigators/navigationUtilities"
interface ScreenProps {
  route: {
    params: {
      type: "wards" | "districts" | "provinces"
      value: { name: string; _id: string }
      setValue: (val) => void
      parentId: string
    }
  }
}

export default function SelectLocation({ route }: ScreenProps) {
  const [keyword, setKeyword] = useState("")
  const [listData, setListData] = useState([])
  const [loading, setLoading] = useState(false)
  const { type, value, setValue, parentId } = route.params
  const getDataList = async (keyword) => {
    setLoading(true)
    let body = {
      limit: -1,
      q: keyword || "",
      cols: "name,name_with_type",
    }
    setLoading(true)
    let resData = {}
    switch (type) {
      case "provinces":
        resData = await getProvincesByPage(body)

        break
      case "districts":
        Object.assign(body, {
          provinceCode: parentId,
        })
        resData = await getDistrictByProvince(body)

        break
      case "wards":
        Object.assign(body, {
          districtCode: parentId,
        })
        resData = await getWardsByDistrict(body)
        break
      default:
        break
    }
    setLoading(false)
    setListData(resData?.data?.data?.data)
  }

  useEffect(() => {
    getDataList("")
  }, [])

  useEffect(() => {
    bounceToSearch()
  }, [keyword])

  let timerId

  function bounceToSearch() {
    clearTimeout(timerId)

    timerId = setTimeout(() => {
      // Code to trigger the search
      getDataList(keyword)
      console.log("Searching...")
    }, 300)
  }
  const title =
    type === "provinces"
      ? "Chọn Tỉnh/ Thành phố"
      : type === "districts"
      ? "Chọn Quận/Huyện"
      : "Chọn Phường/ Xã"
  return (
    <View style={styles.container}>
      <Header title={title} leftIcon="arrow_left" backgroundColor={colors.white} />
      <Searchbar
        value={keyword}
        onChangeText={setKeyword}
        style={styles.searchBar}
        placeholder="Tìm kiếm..."
      />
      {loading && <ActivityIndicator color={colors.primary} />}
      <FlatList
        data={listData}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              title={item?.name}
              onPress={() => {
                setValue(item)
                goBack()
              }}
            />
          )
        }}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchBar: {
    marginVertical: HEIGHT(spacing.md),
    marginHorizontal: WIDTH(spacing.md),
  },
  safeAreaView: {},
})
