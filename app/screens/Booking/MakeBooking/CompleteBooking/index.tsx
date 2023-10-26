import { Platform, Pressable, StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Button, Card } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import CustomPicker from "./Item/CustomPicker/CustomPicker"
import { Icon } from "@app/components/Icon"
import FileAttachment from "./Item/FileAttachment"
import PopupVerify from "@app/components/PopupVerify"
import { useSelector } from "@app/redux/reducers"
import { useDispatch } from "react-redux"
import {
  getOrderHistory,
  updateDocterCreateOrder,
  updatePatientOrder,
  updateSelectedTimeOrder,
  updateSeletedDateOrder,
  updateSpecialListOrder,
} from "@app/redux/actions/actionOrder"
import moment from "moment"
import { EToastType, showToastMessage } from "@app/utils/library"
import { createOrder, updateOrder } from "@app/services/api/functions/order"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import useHookDetailBooking from "../../DetailBooking/useHookDetailBooking"
import PopupErros from "@app/components/PopupErros"
import { DATA_TIME } from "../SelectTimeBooking/Data"
import { translate } from "@app/i18n/translate"
import { Screen } from "@app/components/Screen"
const VALIDATE_MESSAGE = [
  "Vui lòng chọn chuyên khoa!",
  "Vui lòng chọn ngày khám!",
  "Vui lòng chọn giờ khám!",
  "Vui lòng chọn hồ sơ bệnh nhân!",
]
interface ScreenProps {
  route: {
    params: {
      id?: string
      type?: "update"
    }
  }
}
export default function CompleteBooking({ route }: ScreenProps) {
  const [visible, setVisible] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [listImage, setListImage] = useState([])
  const { detailOrder } = useHookDetailBooking(route?.params?.id)
  const docter = useSelector((state) => state.orderReducers.docter)
  const selectedDate = useSelector((state) => state.orderReducers.selectedDate)
  const selectedTime = useSelector((state) => state.orderReducers.selectedTime)
  const patient = useSelector((state) => state.orderReducers.patient)
  const specialist = useSelector((state) => state.orderReducers.specialist)
  const [patientNotes, setPatientNotes] = useState("")
  const [visibleErros, setVisibleErros] = useState(false)
  const dispatch = useDispatch()
  const isUpdate = route?.params?.type === "update"

  console.log("detailOrder_detailOrder", patient, specialist)
  useEffect(() => {
    if (detailOrder?.patientNotes) {
      setPatientNotes(detailOrder?.patientNotes)
      dispatch(
        updatePatientOrder({
          ...detailOrder?.patient,
          id: detailOrder?.patient?.profileId,
        }),
      )
      dispatch(
        updateDocterCreateOrder({
          ...detailOrder?.doctor,
          id: detailOrder?.doctor?.profileId,
        }),
      )
      dispatch(updateSeletedDateOrder(moment(detailOrder?.timeRange?.from).format("YYYY-MM-DD")))
      dispatch(updateSpecialListOrder(detailOrder?.specialist))

      let timeSelected
      DATA_TIME?.forEach((item, index) => {
        item?.data?.forEach((it, id) => {
          if (it.from === moment(detailOrder?.timeRange?.from).format("HH:mm")) {
            timeSelected = it
          }
        })
      })
      dispatch(updateSelectedTimeOrder(timeSelected))
    }
  }, [detailOrder])

  const verifyData = () => {
    if (specialist?.code === "") {
      showToastMessage(VALIDATE_MESSAGE[0], EToastType.ERROR)
    } else if (selectedDate === "") {
      showToastMessage(VALIDATE_MESSAGE[1], EToastType.ERROR)
    } else if (selectedTime?.time === "") {
      showToastMessage(VALIDATE_MESSAGE[2], EToastType.ERROR)
    } else if (patient?.id === "") {
      showToastMessage(VALIDATE_MESSAGE[3], EToastType.ERROR)
    } else if (patientNotes === "") {
      showToastMessage(translate("booking.please_enter_reason"), EToastType.ERROR)
    } else {
      setVisible(true)
    }
  }

  const onCreateAppointment = async () => {
    const startDate = moment(new Date(selectedDate))
      .add(selectedTime.startHour - 7, "hour")
      .add(selectedTime.startMin, "minute")
    const endDate = moment(new Date(selectedDate))
      .add(selectedTime.startHour - 7, "hour")
      .add(selectedTime.startMin + 15, "minute")
    setLoading(true)
    const timeRange = {
      from: startDate.toISOString(),
      to: endDate.toISOString(),
    }
    const formData = new FormData()
    formData.append("patientId", patient.id)
    formData.append("doctorId", docter.id)
    formData.append("specialist", specialist.code)
    formData.append("timeRange", JSON.stringify(timeRange))
    formData.append("patientNotes", patientNotes)
    formData.append("inAppNotification", "true")

    listImage.map((item) => {
      const bodyImage = {
        name: item.fileName || item.uri,
        type: item.type,
        uri: Platform.OS === "ios" ? item.uri.replace("file://", "") : item.uri,
      }
      console.log("bodyImage_bodyImage", bodyImage)
      formData.append("files", bodyImage)
    })
    let resCreate: any = {}
    if (isUpdate) {
      const body = {
        patientId: patient.id,
        doctorId: docter.id,
        specialist: specialist?.code || specialist?.specialistCode,
        timeRange,
        patientNotes,
      }
      resCreate = await updateOrder(route?.params?.id, body)
      if (resCreate.status === 200) {
        dispatch(getOrderHistory())
        goBack()
        goBack()
        showToastMessage(translate("booking.update_booking_success"), EToastType.SUCCESS)
      } else {
        showToastMessage(translate("booking.update_booking_fail"), EToastType.ERROR)
      }
    } else {
      resCreate = await createOrder(formData)
      console.log("resCreate_resCreate", resCreate, formData)
      if (resCreate.status === 201) {
        navigate("BookingSuccess", {
          id: resCreate.data?.[0]?.id,
        })
        dispatch(getOrderHistory())
        showToastMessage(translate("booking.booking_success"), EToastType.SUCCESS)
      } else {
        setVisibleErros(true)
        showToastMessage(translate("booking.booking_fail"), EToastType.ERROR)
      }
    }

    setLoading(false)
  }
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" && ["bottom"]}
      contentContainerStyle={styles.container}
    >
      <Header
        title={translate("booking.select_exam_information")}
        leftIcon="arrow_left"
        backgroundColor={colors.white}
      />
      <KeyboardAwareScrollView>
        <Card mode="contained" style={styles.note}>
          <Text weight="normal" size="ba">
            {translate("booking.provide_full_information")}
          </Text>
        </Card>
        <View style={styles.body}>
          <CustomPicker
            required
            title={translate("booking.specialist")}
            value={specialist?.value || specialist?.name}
            placeholder={translate("booking.select_specialist")}
            onPress={() => navigate("SelectSpecialistAgain", { preScreen: "CompleteBooking" })}
          />
          <CustomPicker
            required
            title={translate("booking.doctor")}
            value={docter?.name}
            placeholder={translate("booking.select_doctor")}
            onPress={() =>
              navigate("SearchDocterAgain", {
                preScreen: "CompleteBooking",
              })
            }
          />
          <Pressable
            onPress={() => {
              navigate("SelectCalendarAgain", {
                preScreen: "CompleteBooking",
              })
            }}
          >
            <TextField
              require
              label={translate("booking.select_date")}
              placeholder={translate("booking.select_date")}
              style={{ color: colors.gray_9 }}
              containerStyle={{ marginVertical: HEIGHT(spacing.sm) }}
              value={moment(selectedDate).format("DD/MM/YYYY")}
              editable={false}
              RightAccessory={() => (
                <Icon
                  icon="calendar"
                  size={20}
                  style={{ marginTop: HEIGHT(10), marginRight: WIDTH(12) }}
                />
              )}
            ></TextField>
          </Pressable>
          <Pressable
            onPress={() => {
              navigate("SelectTimeBookingAgain", {
                preScreen: "CompleteBooking",
              })
            }}
          >
            <TextField
              require
              style={{ color: colors.gray_9 }}
              label={translate("booking.select_time")}
              placeholder={translate("booking.select_time")}
              value={selectedTime?.time}
              editable={false}
              RightAccessory={() => (
                <Icon
                  icon="calendar"
                  size={20}
                  style={{ marginTop: HEIGHT(10), marginRight: WIDTH(12) }}
                />
              )}
            ></TextField>
          </Pressable>

          <CustomPicker
            required
            title={translate("booking.patient")}
            value={patient?.name}
            placeholder={translate("booking.select_patient")}
            onPress={() =>
              navigate("SelectPatientRecordAgain", {
                preScreen: "CompleteBooking",
              })
            }
          />
          <TextField
            require
            label={translate("booking.reason_exam")}
            style={{ color: colors.gray_9, minHeight: HEIGHT(80) }}
            value={patientNotes}
            onChangeText={setPatientNotes}
            placeholder={translate("booking.desc_reason")}
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          {!isUpdate && <FileAttachment listImage={listImage} setListImage={setListImage} />}
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomButton}>
        <Button
          mode="contained"
          style={styles.button}
          loading={loading}
          onPress={() => {
            verifyData()
          }}
        >
          {isUpdate ? translate("common.update") : translate("common.book")}
        </Button>
      </View>
      <PopupVerify
        title={translate("booking.verify_booking")}
        desc={`${translate("booking.confirm_booking")} ${docter?.name} ${translate("booking.in")} ${
          selectedTime?.time
        } ${translate("booking.date")} ${moment(selectedDate).format("DD/MM/YYYY")}. ${translate(
          "booking.please_verify_booking_information",
        )}`}
        visible={visible}
        setVisible={setVisible}
        onRightPress={() => {
          onCreateAppointment()
          setVisible(false)
        }}
        rightText={translate("common.verify")}
        leftText={translate("common.cancel")}
      />
      <PopupErros
        setVisible={setVisibleErros}
        title={translate("booking.booking_fail")}
        desc={translate("booking.please_retry")}
        visible={visibleErros}
      />
      {loading && <LoadingOpacity />}
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingBottom: HEIGHT(80),
    paddingHorizontal: WIDTH(spacing.md),
  },
  button: {
    borderRadius: 8,
    width: WIDTH(343),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  note: {
    backgroundColor: colors.gray_1,
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    backgroundColor: colors.white,
    flexDirection: "row",
    left: 0,
    right: 0,
    justifyContent: "space-between",
    paddingHorizontal: WIDTH(spacing.md),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: HEIGHT(spacing.sm),
  },
})
