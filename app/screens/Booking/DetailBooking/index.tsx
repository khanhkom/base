import { StyleSheet, Image, View, FlatList } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header, Icon } from "@app/components/index"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemBookInformation from "./Item/ItemBookInformation"
import BottonButton from "./Item/BottonButton"
import FileAttachment from "./Item/FileAttachment"
const DATA_BOOK = [
  {
    icon: "calendar",
    title: "Thông tin lịch khám",
    data: [
      {
        title: "Trạng thái: ",
        value: "Đặt lịch",
      },
      {
        title: "Ngày khám: ",
        value: "01/01/2023",
      },
      {
        title: "Giờ khám: ",
        value: "16:00 - 16:30",
      },
    ],
  },
  {
    icon: "personalcard",
    title: "Thông tin bệnh nhân",
    data: [
      {
        title: "Mã bệnh nhân: ",
        value: "YT1234",
      },
      {
        title: "Họ tên: ",
        value: "Nguyễn Văn A",
      },
    ],
  },
  {
    icon: "note",
    title: "Thông tin đăng ký khám",
    data: [
      {
        title: "Bác sĩ: ",
        value: "Nguyễn Văn A",
      },
      {
        title: "Chuyên khoa: ",
        value: "Tai - Mũi - Họng",
      },
    ],
  },
  {
    icon: "ask",
    title: "Lý do khám:",
    data: [
      {
        value: "• Ốm, sốt cao",
        title: "",
      },
      {
        value: "• Ho nhiều, ",
        title: "",
      },
    ],
  },
]
export default function DetailBooking() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chi tiết lịch khám" />

      <FlatList
        data={DATA_BOOK}
        renderItem={({ item, index }) => {
          return <ItemBookInformation item={item} />
        }}
        ListFooterComponent={() => <FileAttachment />}
      />
      <BottonButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
