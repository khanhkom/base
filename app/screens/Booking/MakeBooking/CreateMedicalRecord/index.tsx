import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Button, Card } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import { navigate } from "@app/navigators/navigationUtilities"
import SelectBirthday from "@app/screens/Auth/Register/CreateProfile/Item/SelectBirthday"
import CustomPicker from "./Item/CustomPicker/CustomPicker"
import { Icon } from "@app/components/Icon"
import FileAttachment from "./Item/FileAttachment"
import PopupVerify from "@app/components/PopupVerify"

export default function CreateMedicalRecord() {
  const [visible, setVisible] = React.useState(false)
  return (
    <View style={styles.container}>
      <Header title="Tạo mới hồ sơ y tế" leftIcon="arrow_left" backgroundColor={colors.white} />
      <ScrollView>
        <Card
          mode="contained"
          style={{
            marginTop: HEIGHT(spacing.md),
            marginHorizontal: WIDTH(spacing.md),
            paddingHorizontal: WIDTH(spacing.md),
            paddingVertical: HEIGHT(spacing.sm),
          }}
        >
          <Text weight="normal" size="ba">
            Để việc tư vấn được tốt hơn, hãy cũng cấp đầy đủ thông tin cho bác sĩ!
          </Text>
        </Card>
        <View style={styles.body}>
          <CustomPicker
            required
            title="Chuyên khoa"
            placeholder="Chọn chuyên khoa"
            onPress={() => navigate("SelectSpecialist")}
          />
          <CustomPicker
            required
            title="Bác sĩ"
            placeholder="Chọn bác sĩ"
            onPress={() => navigate("ConsultNow")}
          />
          <SelectBirthday title="Chọn ngày khám" />

          <TextField
            require
            label="Chọn thời gian"
            placeholder="Chọn thời gian"
            value="14:00 - 14:30"
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
            placeholder="Chọn hồ sơ bệnh nhân"
            onPress={() => navigate("SelectPatientRecord")}
          />
          <TextField
            require
            label="Số điện thoại"
            placeholder="0123456789"
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <TextField
            require
            label="Lý do khám"
            multiline
            placeholder={`Mô tả lý do khám:
  -Triệu chứng
  -Tiền sử bệnh,...`}
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <FileAttachment />
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              setVisible(true)
            }}
          >
            Lưu
          </Button>
        </View>
      </ScrollView>
      <PopupVerify
        title="Xác nhận đặt lịch"
        desc="Vui lòng kiểm tra kỹ các thông tin đặt lịch khám. Thông tin không chính xác có thể làm ảnh hướng đến quá trình khám bệnh!"
        visible={visible}
        setVisible={setVisible}
        onRightPress={() => {
          navigate("BookingSuccess")
          setVisible(false)
        }}
        rightText="Xác nhận"
        leftText="Hủy"
      />
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

  button: {
    width: WIDTH(343),
    marginTop: HEIGHT(28),
    borderRadius: 8,
  },
})
