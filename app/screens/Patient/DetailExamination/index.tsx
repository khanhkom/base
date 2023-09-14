import { StyleSheet, View, Image, FlatList, ScrollView } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button, Card, List } from "react-native-paper"
import ItemRecord from "@app/screens/Booking/MakeBooking/SelectPatientRecord/Item/ItemRecord"
import { navigate } from "@app/navigators/navigationUtilities"
import { Text } from "@app/components/Text"
import { Icon } from "@app/components/Icon"
import FileAttachment from "./Item/FileAttachment"
const DATA_INFO = [
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
]
const ItemValue = ({ title, value }) => {
  return (
    <Text size="ba" weight="normal" style={{ color: colors.gray_6, marginTop: HEIGHT(8) }}>
      {title} <Text style={{ color: colors.gray_9 }}>{value}</Text>
    </Text>
  )
}
const ItemHeader = ({ title, icon, backgroundColor, iconColor }) => {
  return (
    <List.Item
      left={() => {
        return (
          <View style={[styles.boxIcon, { backgroundColor }]}>
            <Icon icon={icon} size={WIDTH(20)} color={iconColor || colors.primary} />
          </View>
        )
      }}
      title={() => {
        return (
          <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
            {title}
          </Text>
        )
      }}
    />
  )
}
export default function DetailExamination() {
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Kết quả khám" backgroundColor={colors.gray_1} />

      <ScrollView>
        <ItemRecord
          onPress={() => {
            navigate("ExaminationHistory")
          }}
        />
        <View style={styles.body}>
          <ItemHeader
            icon={"note"}
            title={"Thông tin khám"}
            backgroundColor={colors.blue_0}
            iconColor={colors.primary_6}
          />
          {DATA_INFO.map((item, index) => {
            return <ItemValue key={index} title={item.title} value={item.value} />
          })}
          <ItemHeader
            icon={"department"}
            title={"Chẩn đoán"}
            backgroundColor={colors.red_0}
            iconColor={colors.red_5}
          />
          <Card mode="contained" style={styles.cardDiagnose}>
            <Text size="ba" weight="medium">
              Dị ứng do thời tiết, có dấu hiệu của bệnh viêm xoang cấp mãn tính
            </Text>
          </Card>

          <ItemHeader
            icon={"edit"}
            title={"Ghi chú"}
            backgroundColor={colors.blue_0}
            iconColor={colors.primary_6}
          />
          <Text size="ba" weight="normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s
          </Text>
          <FileAttachment />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },

  body: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.white,
    marginTop: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    flex: 1,
  },
  cardDiagnose: {
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.red_0,
  },
  boxIcon: {
    height: WIDTH(32),
    width: WIDTH(32),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue_0,
  },
})
