import { Platform, ScrollView, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Button, Card } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import { navigate } from "@app/navigators/navigationUtilities"
import SelectBirthday from "@app/screens/CreatePatient/Item/SelectBirthday"
import CustomPicker from "./Item/CustomPicker/CustomPicker"
import { Icon } from "@app/components/Icon"
import FileAttachment from "./Item/FileAttachment"
import PopupVerify from "@app/components/PopupVerify"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import { getOrderHistory, updateSeletedDateOrder } from "@app/redux/actions/actionOrder"
import moment from "moment"
import { EToastType, showToastMessage } from "@app/utils/library"
import { createOrder } from "@app/services/api/functions/order"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

export default function CreateMedicalRecord() {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [listImage, setListImage] = useState([])

  const docter = useSelector((state) => state.orderReducers.docter)
  const selectedDate = useSelector((state) => state.orderReducers.selectedDate)
  const selectedTime = useSelector((state) => state.orderReducers.selectedTime)
  const patient = useSelector((state) => state.orderReducers.patient)
  const specialist = useSelector((state) => state.orderReducers.specialist)
  const [patientNotes, setPatientNotes] = useState("")
  const dispatch = useDispatch()
  const verifyData = () => {
    if (patientNotes === "") {
      showToastMessage("Vui lòng nhập lý do", EToastType.ERROR)
    } else {
      setVisible(true)
    }
  }
  const onCreateAppointment = async () => {
    const startDate = moment(new Date(selectedDate))
      .add(selectedTime.startHour, "hour")
      .add(selectedTime.startMin, "minute")
    const endDate = moment(new Date(selectedDate))
      .add(selectedTime.startHour, "hour")
      .add(selectedTime.startMin + 15, "minute")
    setLoading(true)
    let timeRange = {
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    }
    let formData = new FormData()
    formData.append("patientId", patient.id)
    formData.append("doctorId", docter.id)
    formData.append("specialist", specialist.code)
    formData.append("timeRange", JSON.stringify(timeRange))
    formData.append("patientNotes", patientNotes)
    formData.append("inAppNotification", "false")

    listImage.map((item) => {
      formData.append("files", {
        name: item.name,
        type: item.type,
        uri: Platform.OS === "ios" ? item.uri.replace("file://", "") : item.uri,
      })
    })

    let resCreate = await createOrder(formData)
    // navigate("BookingSuccess")
    if (resCreate.status === 201) {
      navigate("BookingSuccess", {
        id: resCreate.data.id,
      })
      dispatch(getOrderHistory())

      showToastMessage("Đặt lịch thành công!", EToastType.SUCCESS)
    } else {
      showToastMessage("Đặt lịch thất bại!", EToastType.SUCCESS)
    }
    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <Header title="Chọn thông tin khám" leftIcon="arrow_left" backgroundColor={colors.white} />
      <KeyboardAwareScrollView>
        <Card mode="contained" style={styles.note}>
          <Text weight="normal" size="ba">
            Để việc tư vấn được tốt hơn, hãy cũng cấp đầy đủ thông tin cho bác sĩ!
          </Text>
        </Card>
        <View style={styles.body}>
          <CustomPicker
            required
            title="Chuyên khoa"
            value={specialist?.name}
            placeholder="Chọn chuyên khoa"
            onPress={() => navigate("SelectSpecialist")}
          />
          <CustomPicker
            required
            title="Bác sĩ"
            value={docter?.name}
            placeholder="Chọn bác sĩ"
            onPress={() => navigate("SearchDocter")}
          />
          <SelectBirthday
            value={selectedDate}
            title="Chọn ngày khám"
            onSelectDate={(date) => {
              dispatch(updateSeletedDateOrder(moment(date).format("YYYY-MM-DD")))
            }}
          />

          <TextField
            require
            label="Chọn thời gian"
            placeholder="Chọn thời gian"
            value={selectedTime?.time}
            RightAccessory={() => (
              <Icon
                icon="calendar"
                size={20}
                style={{ marginTop: HEIGHT(10), marginRight: WIDTH(12) }}
              />
            )}
          ></TextField>
          <CustomPicker
            required
            title="Bệnh nhân"
            value={patient?.name}
            placeholder="Chọn hồ sơ bệnh nhân"
            onPress={() => navigate("SelectPatientRecord")}
          />
          <TextField
            require
            label="Số điện thoại"
            placeholder="0123456789"
            value={patient?.mail}
            style={{ color: colors.gray_9 }}
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <TextField
            require
            label="Lý do khám"
            multiline
            style={{ color: colors.gray_9 }}
            value={patientNotes}
            onChangeText={setPatientNotes}
            placeholder={`Mô tả lý do khám:
  -Triệu chứng
  -Tiền sử bệnh,...`}
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <FileAttachment listImage={listImage} setListImage={setListImage} />
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              verifyData()
            }}
          >
            Lưu
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <PopupVerify
        title="Xác nhận đặt lịch"
        desc="Vui lòng kiểm tra kỹ các thông tin đặt lịch khám. Thông tin không chính xác có thể làm ảnh hướng đến quá trình khám bệnh!"
        visible={visible}
        setVisible={setVisible}
        onRightPress={() => {
          onCreateAppointment()
          setVisible(false)
        }}
        rightText="Xác nhận"
        leftText="Hủy"
      />
      {loading && <LoadingOpacity />}
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingBottom: HEIGHT(28),
    paddingHorizontal: WIDTH(spacing.md),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  note: {
    marginTop: HEIGHT(spacing.md),
    marginHorizontal: WIDTH(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.gray_1,
  },
  button: {
    width: WIDTH(343),
    marginTop: HEIGHT(28),
    borderRadius: 8,
  },
})
