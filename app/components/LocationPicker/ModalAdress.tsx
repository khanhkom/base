import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import Modal from "react-native-modal"
import { HEIGHT, WIDTH } from "@app/config/functions"
import colors from "@app/assets/colors"
import { List, Searchbar } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
interface ItemProps {
  visible: boolean
  setVisible: (val: boolean) => void
}
const vietnamCities = [
  "Ho Chi Minh City",
  "Hanoi",
  "Da Nang",
  "Hai Phong",
  "Can Tho",
  "Bien Hoa",
  "Hue",
  "Nha Trang",
  "Qui Nhon",
  "Vung Tau",
  "Buon Ma Thuot",
  "Ha Long",
  "Phan Thiet",
  "Cam Ranh",
  "Da Lat",
  "My Tho",
  "Rach Gia",
  "Long Xuyen",
  "Thai Nguyen",
  "Soc Trang",
]

export default function ModalAdress({ visible, setVisible }: ItemProps) {
  const [keyword, setKeyword] = useState("")
  return (
    <Modal
      isVisible={visible}
      avoidKeyboard
      backdropOpacity={0.5}
      onBackButtonPress={() => {
        setVisible(false)
      }}
      onBackdropPress={() => {
        setVisible(false)
      }}
    >
      <View style={styles.container}>
        <Searchbar value={keyword} style={styles.searchBar} />
        <FlatList
          data={vietnamCities}
          renderItem={({ item, index }) => {
            return <List.Item title={item} />
          }}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT(600),
    width: WIDTH(343),
    borderRadius: 8,
    backgroundColor: colors.white,
    position: "absolute",
    top: 0,
  },
  searchBar: {
    marginVertical: HEIGHT(spacing.md),
    marginHorizontal: WIDTH(spacing.md),
  },
  safeAreaView: {},
})
