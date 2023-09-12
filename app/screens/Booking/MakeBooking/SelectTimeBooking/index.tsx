import { StyleSheet, View, FlatList } from "react-native"
import React, { useState } from "react"
import { Header, Text } from "@app/components/index"
import colors from "@app/assets/colors"
import TitleInfor from "../Item/TitleInfor"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Button, Card } from "react-native-paper"
import ButtonTime from "./Item/ButtonTime"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { DATA_EXPLAIN, DATA_TIME } from "./Data"
import { navigate } from "@app/navigators/navigationUtilities"

export default function SelectTimeBooking() {
  const [timeSelected, setTimeSelected] = useState(-1)
  console.log("timeSelected", timeSelected)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Chọn giờ khám" backgroundColor={colors.white} />
      <TitleInfor
        title="Thông tin giờ khám"
        data={DATA_EXPLAIN}
        styleStatus={{ width: WIDTH(220) }}
      />
      <FlatList
        data={DATA_TIME}
        renderItem={({ item }) => {
          return (
            <Card style={styles.card}>
              <Text size="md" weight="medium" style={{ color: colors.black }}>
                {item.title}
              </Text>
              <View style={styles.wrapperTime}>
                {item.data.map((item, index) => {
                  return (
                    <ButtonTime
                      onPress={() => setTimeSelected(item.id)}
                      title={item.time}
                      status={item.status}
                      key={index}
                      selected={timeSelected === item.id}
                    />
                  )
                })}
              </View>
            </Card>
          )
        }}
        extraData={timeSelected}
        contentContainerStyle={styles.flatlist}
      />
      <Button
        onPress={() => {
          navigate("CreateMedicalRecord")
        }}
        mode="contained"
        style={{ marginBottom: HEIGHT(spacing.md), marginHorizontal: WIDTH(spacing.md) }}
      >
        Tiếp theo
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: R.colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },
  container: {
    backgroundColor: colors.gray_1,
    flex: 1,
  },
  flatlist: { paddingBottom: 10 },
  wrapperTime: { flexDirection: "row", flexWrap: "wrap" },
})
