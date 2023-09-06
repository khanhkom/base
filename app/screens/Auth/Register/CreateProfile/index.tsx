import { ScrollView, StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { Card } from "react-native-paper"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { TextField } from "@app/components/TextField"
import { Toggle } from "@app/components/Toggle"
import SelectBirthday from "./Item/SelectBirthday"

export default function CreateProfile() {
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
              containerStyle={{ flexDirection: "row" }}
              variant="radio"
              label="Nam"
              labelPosition="right"
              value={true}
            />
            <Toggle
              containerStyle={{ flexDirection: "row" }}
              variant="radio"
              label="Nữ"
              labelPosition="right"
            />
          </View>
          <TextField
            label="Email"
            placeholder="Nhập địa chỉ email"
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
          <TextField
            label="Địa chỉ chi tiết"
            placeholder="Ví dụ: Số nhà, đường, ..."
            containerStyle={{ marginTop: HEIGHT(spacing.md) }}
          ></TextField>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    paddingHorizontal: WIDTH(spacing.md),
  },
  flexGender: {
    flexDirection: "row",
    alignItems: "center",
    width: WIDTH(150),
    justifyContent: "space-between",
    paddingVertical: HEIGHT(spacing.md),
    paddingLeft: WIDTH(spacing.xs),
  },
})
