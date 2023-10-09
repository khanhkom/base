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
import useHookDetailExam, { TYPE_INFO_RESULT } from "./useHookDetailExam"
import LoadingScreen from "@app/components/loading/LoadingScreen"
import { ISpecialList } from "@app/interface/docter"
import ImageView from "react-native-image-viewing"

const DATA_INFO = [
  {
    title: "Mã phiếu khám: ",
    type: TYPE_INFO_RESULT.MA_PHIEU,
  },
  {
    title: "Bác sĩ: ",
    value: "Đặt lịch",
    type: TYPE_INFO_RESULT.BAC_SI,
  },
  {
    title: "Chuyên khoa: ",
    type: TYPE_INFO_RESULT.CHUYEN_KHOA,
  },
  {
    title: "Ngày khám: ",
    type: TYPE_INFO_RESULT.NGAY_KHAM,
  },
  {
    title: "Giờ khám: ",
    type: TYPE_INFO_RESULT.GIO_KHAM,
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
interface IScreenParams {
  route: {
    params: {
      id: string
      specialist: ISpecialList
    }
  }
}
export default function DetailExamination({ route }: IScreenParams) {
  console.log("route", route.params.id)
  const id = route.params.id
  const specialist = route.params?.specialist
  const [visible, setIsVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const { loading, detailResult, returnDataByField } = useHookDetailExam(id, specialist?.value)
  console.log("detailResult", detailResult)
  if (loading) return <LoadingScreen />
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Kết quả khám" backgroundColor={colors.gray_1} />

      <ScrollView>
        <ItemRecord
          onPress={() => {
            navigate("ExaminationHistory")
          }}
          item={detailResult?.order?.patient}
        />
        <View style={styles.body}>
          <ItemHeader
            icon={"note"}
            title={"Thông tin khám"}
            backgroundColor={colors.blue_0}
            iconColor={colors.primary_6}
          />
          {DATA_INFO.map((item, index) => {
            return <ItemValue key={index} title={item.title} value={returnDataByField(item.type)} />
          })}
          <ItemHeader
            icon={"department"}
            title={"Chẩn đoán"}
            backgroundColor={colors.red_0}
            iconColor={colors.red_5}
          />
          <Card mode="contained" style={styles.cardDiagnose}>
            <Text size="ba" weight="medium">
              {detailResult?.result?.description}
            </Text>
          </Card>
          <ItemHeader
            icon={"edit"}
            title={"Ghi chú"}
            backgroundColor={colors.blue_0}
            iconColor={colors.primary_6}
          />
          <Text size="ba" weight="normal">
            {detailResult?.result?.note}
          </Text>
          <FileAttachment
            data={detailResult?.result?.fileUpload ?? []}
            onPress={(index) => {
              setImageIndex(index)
              setIsVisible(true)
            }}
          />
          <ImageView
            images={(detailResult?.result?.fileUpload ?? [])?.map((item) => {
              return { uri: item }
            })}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
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
    marginBottom: HEIGHT(spacing.xs),
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
