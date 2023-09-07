import { ScrollView, StyleSheet, View } from "react-native"
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
import { navigate } from "@app/navigators/navigationUtilities"

export default function CreateProfile() {
  const [gender, setGender] = useState(0)
  return (
    <View style={styles.container}>
      <Header
        title="Tạo mới hồ sơ y tế"
        leftIcon="arrow_left"
        rightText="Bỏ qua"
        rightIconColor={colors.blue_6}
        backgroundColor={colors.white}
      />
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
            Vui lòng nhập chính xác thông tin của bệnh nhân (người khám) theo thông tin giấy tờ tùy
            thân (CCCD/CMND/BHYT). Thông tin không chính xác có thể làm gián đoạn quá trình khám,
            chữa bệnh của bạn.
          </Text>
          <Text weight="normal" size="ba">
            <Text weight="normal" size="ba" style={{ color: colors.red_5 }}>
              Lưu ý:
            </Text>{" "}
            là những trường thông tin bắt buộc
          </Text>
        </Card>
        <View style={styles.body}>
          <TextField
            require
            label="Họ và tên"
            placeholder="Nguyễn Văn A"
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <TextField
            require
            label="Số điện thoại"
            placeholder="0123456789"
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <SelectBirthday />
          <Text preset="formLabel">
            Giới tính
            {require && (
              <Text preset="formLabel" style={{ color: colors.red_5 }}>
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
            placeholder="Nhập địa chỉ email"
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <LocationPicker title="Tỉnh/ Thành phố" placeholder="Chọn Tỉnh/ Thành phố" />
          <LocationPicker title="Quận/ Huyện" placeholder="Chọn Quận/ Huyện" />
          <LocationPicker title="Phường/ Xã" placeholder="Chọn Phường/Xã" />
          <TextField
            label="Địa chỉ chi tiết"
            placeholder="Ví dụ: Số nhà, đường, ..."
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              navigate("TabNavigator")
            }}
          >
            Lưu
          </Button>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    paddingBottom: HEIGHT(100),
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
})
