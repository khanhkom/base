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
import LoadingScreen from "@app/components/loading/LoadingScreen"
import { getListSpecialListRequest } from "@app/redux/actions/actionDoctor"
import { useSelector } from "@app/redux/reducers"
interface ScreenProps {
  route: {
    params: {
      preScreen?: string
    }
  }
}
export default function SelectSpecialist({ route }: ScreenProps) {
  const dispatch = useDispatch()
  const specialList = useSelector((state) => state.doctorReducers.listSpecialList)
  const loading = useSelector((state) => state.doctorReducers.loading)

  useEffect(() => {
    dispatch(getListSpecialListRequest())
  }, [])
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn chuyên khoa" backgroundColor={colors.gray_1} />
      <FlatList
        data={specialList}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              title={item.name}
              style={styles.item}
              onPress={() => {
                dispatch(updateSpecialListOrder(item))
                if (route?.params?.preScreen) {
                  goBack()
                } else {
                  navigate("SearchDocter", {
                    speciallist: item,
                  })
                }
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
