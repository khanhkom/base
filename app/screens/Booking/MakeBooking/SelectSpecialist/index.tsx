import { StyleSheet, Image, View, FlatList } from "react-native"
import React, { useEffect, useState } from "react"
import colors from "@app/assets/colors"
import { Header, Icon } from "@app/components/index"
import { List } from "react-native-paper"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { updateSpecialListOrder } from "@app/redux/actions/actionOrder"
import { ISpecialList } from "@app/interface/docter"
import { getListSpecialList } from "@app/services/api/functions/docter"
import LoadingScreen from "@app/components/loading/LoadingScreen"
export default function SelectSpecialist() {
  const dispatch = useDispatch()
  const [specialList, setListSpecialList] = useState<ISpecialList[]>([])
  const [loading, setLoading] = useState(false)
  const getListData = async () => {
    setLoading(true)
    let resList = await getListSpecialList()
    setListSpecialList(resList.data)
    setLoading(false)
  }
  useEffect(() => {
    getListData()
  }, [])
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tư vấn trực tuyến" backgroundColor={colors.gray_1} />
      <FlatList
        data={specialList}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              title={item.name}
              style={styles.item}
              onPress={() => {
                dispatch(updateSpecialListOrder(item))
                navigate("SearchDocter")
              }}
              left={() => {
                return (
                  <Image source={R.images.features_1} style={styles.icon} resizeMode="contain" />
                )
              }}
              right={() => {
                return (
                  <View style={{ alignSelf: "center" }}>
                    <Icon icon="arrow_right" size={20} />
                  </View>
                )
              }}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: WIDTH(spacing.md),
    backgroundColor: colors.white,
    borderRadius: WIDTH(8),
    paddingLeft: WIDTH(spacing.sm),
    marginTop: HEIGHT(spacing.sm),
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
  icon: {
    height: WIDTH(32),
    width: WIDTH(32),
  },
})
