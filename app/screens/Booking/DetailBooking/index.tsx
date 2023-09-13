import { StyleSheet, Image, View, FlatList } from "react-native"
import React from "react"
import colors from "@app/assets/colors"
import { Header, Icon, Text } from "@app/components/index"
import { navigate } from "@app/navigators/navigationUtilities"
import ItemBookInformation from "./Item/ItemBookInformation"
import BottonButton from "./Item/BottonButton"
import FileAttachment from "./Item/FileAttachment"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
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
export default function DetailBooking({ route }) {
  const status = route?.params?.status
  console.log("AAAAAAAAAA", status)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chi tiết lịch khám" />

      <FlatList
        data={DATA_BOOK}
        renderItem={({ item, index }) => {
          return <ItemBookInformation item={item} />
        }}
        ListFooterComponent={() => <FileAttachment />}
        ListHeaderComponent={() => {
          if (status === 3)
            return (
              <List.Item
                style={{
                  backgroundColor: colors.red_6,
                  paddingLeft: WIDTH(spacing.md),
                  marginBottom: HEIGHT(spacing.md),
                }}
                left={() => {
                  return (
                    <View style={{ alignSelf: "center" }}>
                      <Icon icon="refresh" size={WIDTH(20)} color={colors.white} />
                    </View>
                  )
                }}
                title={() => {
                  return (
                    <Text size="ba" weight="normal" style={{ color: colors.white }}>
                      Lý do hủy: Không có nhu cầu khám
                    </Text>
                  )
                }}
              />
            )
          return <View style={{ height: HEIGHT(spacing.md) }} />
        }}
      />
      <BottonButton status={status} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
})
