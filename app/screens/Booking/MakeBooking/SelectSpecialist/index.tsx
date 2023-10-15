import { StyleSheet, Image, View, FlatList } from "react-native"
import React, { useEffect } from "react"
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
      <Header
        leftIcon="arrow_left"
        titleTx="booking.select_specialist"
        backgroundColor={colors.gray_1}
      />
      <FlatList
        data={specialList}
        renderItem={({ item }) => {
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
                  <View style={styles.wrapperIcon}>
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
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
  icon: {
    height: WIDTH(32),
    width: WIDTH(32),
  },
  item: {
    backgroundColor: colors.white,
    borderRadius: WIDTH(8),
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.sm),
    paddingLeft: WIDTH(spacing.sm),
  },
  wrapperIcon: { alignSelf: "center" },
})
