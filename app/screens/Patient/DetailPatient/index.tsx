import { FlatList, Platform, StyleSheet, View } from "react-native"
import React from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import useDetailPatient, { DATA_DETAIL_PATIENT } from "./useDetailPatient"
import { Text } from "@app/components/Text"
import { Button, Divider } from "react-native-paper"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { navigate } from "@app/navigators/navigationUtilities"
import { Screen } from "@app/components/Screen"

interface ScreenProps {
  route: {
    params: {
      id: string
    }
  }
}
export default function DetailPatient({ route }: ScreenProps) {
  const id = route?.params?.id
  const { loading, getDetailOrderApi, returnDataByField } = useDetailPatient(id)
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header
        leftIcon="arrow_left"
        title="Thông tin hồ sơ y tế"
        backgroundColor={colors.white}
        rightIcon="edit_2"
        onRightPress={() => {
          navigate("CreatePatient", {
            id,
            getDetailOrderApi,
          })
        }}
      />
      <FlatList
        data={DATA_DETAIL_PATIENT}
        renderItem={({ item, index }) => {
          const isEmptyValue = returnDataByField(item.field) === ""
          return (
            <View>
              <Text
                size="ba"
                weight="medium"
                style={{ color: colors.gray_7, marginBottom: HEIGHT(spacing.xxs) }}
              >
                {item.title}
              </Text>
              <Text
                size="md"
                weight="medium"
                style={{ color: isEmptyValue ? colors.gray_6 : colors.gray_9 }}
              >
                {isEmptyValue ? "Chưa cập nhật" : returnDataByField(item.field)}
              </Text>
            </View>
          )
        }}
        ItemSeparatorComponent={() => {
          return <Divider style={{ marginVertical: HEIGHT(spacing.sm) }} />
        }}
        style={{ paddingTop: HEIGHT(spacing.sm) }}
        contentContainerStyle={{ paddingHorizontal: WIDTH(spacing.md) }}
      />
      <View style={styles.bottomButton}>
        <Button mode="contained" style={styles.button} loading={loading} onPress={() => {}}>
          Xem lịch sử khám
        </Button>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  button: {
    borderRadius: 8,
    width: WIDTH(343),
    backgroundColor: colors.primary,
  },
})
