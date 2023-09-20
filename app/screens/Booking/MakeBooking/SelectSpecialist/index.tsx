import { StyleSheet, Image, View, FlatList } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header, Icon } from "@app/components/index"
import { List } from "react-native-paper"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { useDispatch } from "react-redux"
import { updateSpecialListOrder } from "@app/redux/actions/actionOrder"
const DATA = [
  {
    title: "Răng Hàm Mặt",
    icon: R.images.features_1,
    id: "001",
  },
  {
    title: "Nhi khoa",
    icon: R.images.features_2,
    id: "002",
  },
  {
    title: "Da liễu",
    icon: R.images.features_3,
    id: "003",
  },
]
export default function SelectSpecialist() {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Tư vấn trực tuyến" />
      <FlatList
        data={DATA}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              title={item.title}
              style={styles.item}
              onPress={() => {
                dispatch(updateSpecialListOrder(item))
                navigate("SearchDocter")
              }}
              left={() => {
                return <Image source={item.icon} style={styles.icon} resizeMode="contain" />
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
