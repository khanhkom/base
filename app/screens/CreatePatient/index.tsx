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
import moment from "moment"
import { EToastType, showToastMessage } from "@app/utils/library"
import { createPatient } from "@app/services/api/functions/patient"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { getListPatientRequest } from "@app/redux/actions/patient"
import { useDispatch } from "react-redux"
import { Formik } from "formik"
import * as Yup from "yup"
import { translate } from "@app/i18n/translate"
const SignupSchema = Yup.object().shape({
  name: Yup.string().required(translate("create_patient.please_enter_fullname")),
  phone: Yup.string().required(translate("create_patient.please_enter_phone")),
  birthday: Yup.string().required(translate("create_patient.please_enter_date_birth")),
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
    const resUpdate = await createPatient(bodyCreate)
    setLoading(false)
    if (resUpdate?.status === 201) {
      showToastMessage(translate("create_patient.create_patient_successful"))
      if (isNavigateFromRegister) {
        navigate("TabNavigator")
      } else {
        dispatch(getListPatientRequest())
        goBack()
      }
    } else {
      showToastMessage(translate("create_patient.create_patient_failure"), EToastType.ERROR)
    }
  }
  return (
    <View style={styles.container}>
      <Header
        title={translate("create_patient.create_new_patient")}
        leftIcon="arrow_left"
        rightText={isNavigateFromRegister ? translate("common.skip") : undefined}
        rightIconColor={colors.blue_6}
        backgroundColor={colors.white}
        onRightPress={() => {
          if (!isNavigateFromRegister) {
            goBack()
          } else {
            navigate("TabNavigator")
          }
        }}
      />
      <KeyboardAwareScrollView>
        <Card mode="contained" style={styles.nodeCard}>
          <Text weight="normal" size="ba">
            {translate("create_patient.please_enter_information")}
          </Text>
          <Text weight="normal" size="ba">
            <Text weight="normal" size="ba" style={{ color: colors.red_5 }}>
              {translate("create_patient.note")}
            </Text>{" "}
            <Text style={{ color: colors.red_5 }}> * </Text>
            {translate("create_patient.field_required")}
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
                label={translate("create_patient.full_name")}
                placeholder={translate("create_patient.enter_fullname")}
                value={values.name}
                status={errors.name && "error"}
                helper={errors.name}
                onChangeText={handleChange("name")}
                containerStyle={{ marginTop: HEIGHT(spacing.md) }}
              ></TextField>
              <TextField
                require
                label={translate("common.phonenumber")}
                placeholder={translate("auth.enter_your_phone_number")}
                value={values.phone}
                status={errors.phone && "error"}
                helper={errors.phone}
                onChangeText={handleChange("phone")}
                keyboardType="decimal-pad"
                style={{ color: colors.gray_9 }}
                containerStyle={{ marginTop: HEIGHT(spacing.md) }}
              ></TextField>
              <SelectBirthday
                title={translate("create_patient.date_of_birth")}
                status={errors.birthday && "error"}
                helper={errors.birthday}
                value={values.birthday}
                onSelectDate={(date) => setFieldValue("birthday", moment(date).toISOString())}
              />
              <Text preset="formLabel">
                {translate("create_patient.gender")}
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
                  label={translate("create_patient.male")}
                  labelPosition="right"
                  value={gender === 0}
                />
                <Toggle
                  containerStyle={styles.flexRow}
                  variant="radio"
                  onPress={() => setGender(1)}
                  value={gender === 1}
                  label={translate("create_patient.fe_male")}
                  labelPosition="right"
                />
              </View>
              <TextField
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder={translate("create_patient.enter_email")}
                containerStyle={{ marginTop: HEIGHT(spacing.md) }}
              ></TextField>
              <LocationPicker
                value={provinces}
                setValue={(val) => {
                  setProvinces(val)
                  setDistricts({ name: "", _id: "" })
                  setWards({ name: "", _id: "" })
                }}
                title={translate("create_patient.province")}
                parentId={""}
                placeholder={translate("create_patient.select_province")}
                type="provinces"
              />
              <LocationPicker
                value={districts}
                setValue={(val) => {
                  setDistricts(val)
                  setWards({ name: "", _id: "" })
                }}
                parentId={provinces?.code}
                title={translate("create_patient.district")}
                placeholder={translate("create_patient.select_district")}
                type="districts"
              />
              <LocationPicker
                value={wards}
                setValue={setWards}
                parentId={districts?.code}
                title={translate("create_patient.ward")}
                placeholder={translate("create_patient.select_ward")}
                type="wards"
              />
              <TextField
                label={translate("create_patient.detail_address")}
                placeholder={translate("create_patient.example_address")}
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
                {translate("common.save")}
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
