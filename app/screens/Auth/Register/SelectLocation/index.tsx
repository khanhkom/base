import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
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
import { goBack } from "@app/navigators/navigationUtilities"
import { translate } from "@app/i18n/translate"
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
  const { type, setValue, parentId } = route.params
  const getDataList = async (keyword) => {
    setLoading(true)
    const body = {
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
    }, 300)
  }
  const title =
    type === "provinces"
      ? translate("create_patient.select_province")
      : type === "districts"
      ? translate("create_patient.select_district")
      : translate("create_patient.select_ward")
  return (
    <View style={styles.container}>
      <Header title={title} leftIcon="arrow_left" backgroundColor={colors.white} />
      <Searchbar
        value={keyword}
        onChangeText={setKeyword}
        style={styles.searchBar}
        placeholder={translate("common.searching")}
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
    backgroundColor: colors.white,
    flex: 1,
  },
  searchBar: {
    marginHorizontal: WIDTH(spacing.md),
    marginVertical: HEIGHT(spacing.md),
  },
})
