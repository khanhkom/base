import { StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Button, Card } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import { Toggle } from "@app/components/Toggle"
import SelectBirthday from "./Item/SelectBirthday"
import LocationPicker from "@app/components/LocationPicker/LocationPicker"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { useSelector } from "@app/redux/reducers"
import { LoadingOpacity } from "@app/components/loading/LoadingOpacity"
import moment from "moment"
import { EToastType, showToastMessage } from "@app/utils/library"
import { createPatient } from "@app/services/api/functions/patient"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { getListPatientRequest } from "@app/redux/actions/patient"
import { useDispatch } from "react-redux"
import { Formik } from "formik"
import * as Yup from "yup"
const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập họ tên!"),
  phone: Yup.string().required("Vui lòng nhập số điện thoại!"),
  birthday: Yup.string().required("Vui lòng chọn ngày sinh!"),
})
export default function CreatePatient({ route }) {
  const user = useSelector((state) => state.userReducers.user)
  console.log("user", user)
  const [gender, setGender] = useState(0)
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [provinces, setProvinces] = useState({
    _id: "",
    name: "",
    slug: "",
    type: "",
    name_with_type: "",
    code: "",
  })
  const [districts, setDistricts] = useState({
    _id: "",
    name: "",
    type: "",
    slug: "",
    name_with_type: "",
    path: "",
    path_with_type: "",
    code: "",
    parent_code: "",
  })
  const [wards, setWards] = useState({
    _id: "",
    name: "",
    type: "",
    slug: "",
    name_with_type: "",
    path: "",
    path_with_type: "",
    code: "",
    parent_code: "",
    isDeleted: false,
  })
  const isNavigateFromRegister = route?.params?.fromRegister
  const onCreateProfile = async (values: { name: string; phone: string; birthday: Date }) => {
    setLoading(true)
    const bodyCreate = {
      name: values.name,
      gender: gender === 0 ? "male" : "female",
      birthday: moment(values.birthday).format("DD/MM/YYYY"),
      mail: email,
      province: provinces?.name,
      city: districts?.name,
      ward: wards?.name,
      address: address,
      phone: values.phone,
    }
    let resUpdate = await createPatient(bodyCreate)
    setLoading(false)
    if (resUpdate?.status === 201) {
      showToastMessage("Tạo hồ sơ thành công!")
      if (isNavigateFromRegister) {
        navigate("TabNavigator")
      } else {
        dispatch(getListPatientRequest())
        goBack()
      }
    } else {
      showToastMessage("Tạo hồ sơ thất bại!", EToastType.ERROR)
    }
  }
  return (
    <View style={styles.container}>
      <Header
        title="Tạo mới hồ sơ y tế"
        leftIcon="arrow_left"
        rightText={isNavigateFromRegister ? "Bỏ qua" : undefined}
        rightIconColor={colors.blue_6}
        backgroundColor={colors.white}
      />
      <KeyboardAwareScrollView>
        <Card mode="contained" style={styles.nodeCard}>
          <Text weight="normal" size="ba">
            Vui lòng nhập chính xác thông tin của bệnh nhân (người khám) theo thông tin giấy tờ tùy
            thân (CCCD/CMND/BHYT). Thông tin không chính xác có thể làm gián đoạn quá trình khám,
            chữa bệnh của bạn.
          </Text>
          <Text weight="normal" size="ba">
            <Text weight="normal" size="ba" style={{ color: colors.red_5 }}>
              Lưu ý:
            </Text>{" "}
            <Text style={{ color: colors.red_5 }}> * </Text>
            là những trường thông tin bắt buộc
          </Text>
        </Card>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{ name: user?.name, phone: user?.phone, birthday: "" }}
          onSubmit={(values) => {
            onCreateProfile(values)
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={styles.body}>
              <TextField
                require
                label="Họ và tên"
                placeholder="Nhập họ tên"
                value={values.name}
                status={errors.name && "error"}
                helper={errors.name}
                onChangeText={handleChange("name")}
                containerStyle={{ marginTop: HEIGHT(spacing.md) }}
              ></TextField>
              <TextField
                require
                label="Số điện thoại"
                placeholder="Nhập số điện thoại"
                value={values.phone}
                status={errors.phone && "error"}
                helper={errors.phone}
                onChangeText={handleChange("phone")}
                keyboardType="decimal-pad"
                style={{ color: colors.gray_9 }}
                containerStyle={{ marginTop: HEIGHT(spacing.md) }}
              ></TextField>
              <SelectBirthday
                title="Ngày sinh"
                status={errors.birthday && "error"}
                helper={errors.birthday}
                value={values.birthday}
                onSelectDate={(date) => setFieldValue("birthday", moment(date).toISOString())}
              />
              <Text preset="formLabel">
                Giới tính
                {require && (
                  <Text preset="formLabel" style={{ color: colors.red_5 }}>
                    {" "}
                    *
                  </Text>
                )}
              </Text>
              <View style={styles.flexGender}>
                <Toggle
                  containerStyle={styles.flexRow}
                  variant="radio"
                  onPress={() => setGender(0)}
                  label="Nam"
                  labelPosition="right"
                  value={gender === 0}
                />
                <Toggle
                  containerStyle={styles.flexRow}
                  variant="radio"
                  onPress={() => setGender(1)}
                  value={gender === 1}
                  label="Nữ"
                  labelPosition="right"
                />
              </View>
              <TextField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="Nhập địa chỉ email"
                containerStyle={{ marginTop: HEIGHT(spacing.md) }}
              ></TextField>
              <LocationPicker
                value={provinces}
                setValue={(val) => {
                  setProvinces(val)
                  setDistricts({ name: "", _id: "" })
                  setWards({ name: "", _id: "" })
                }}
                title="Tỉnh/ Thành phố"
                parentId={""}
                placeholder="Chọn Tỉnh/ Thành phố"
                type="provinces"
              />
              <LocationPicker
                value={districts}
                setValue={(val) => {
                  setDistricts(val)
                  setWards({ name: "", _id: "" })
                }}
                parentId={provinces?.code}
                title="Quận/ Huyện"
                placeholder="Chọn Quận/ Huyện"
                type="districts"
              />
              <LocationPicker
                value={wards}
                setValue={setWards}
                parentId={districts?.code}
                title="Phường/ Xã"
                placeholder="Chọn Phường/Xã"
                type="wards"
              />
              <TextField
                label="Địa chỉ chi tiết"
                placeholder="Ví dụ: Số nhà, đường, ..."
                value={address}
                onChangeText={setAddress}
                containerStyle={{ marginTop: HEIGHT(spacing.md) }}
              ></TextField>
              <Button
                mode="contained"
                style={styles.button}
                onPress={handleSubmit}
                loading={loading}
              >
                Lưu
              </Button>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingBottom: HEIGHT(16),
    paddingHorizontal: WIDTH(spacing.md),
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  flexGender: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: WIDTH(spacing.xs),
    paddingVertical: HEIGHT(spacing.md),
    width: WIDTH(150),
  },
  flexRow: {
    flexDirection: "row",
  },
  button: {
    width: WIDTH(343),
    marginTop: HEIGHT(28),
    borderRadius: 8,
  },
  nodeCard: {
    marginTop: HEIGHT(spacing.md),
    marginHorizontal: WIDTH(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.gray_1,
  },
})
