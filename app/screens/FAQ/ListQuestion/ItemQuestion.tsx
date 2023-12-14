import { Image, StyleSheet, View } from "react-native"
import React from "react"
import { Card, Divider, List } from "react-native-paper"
import R from "@app/assets"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { IQuestion } from "@app/interface/question"
import moment from "moment"
interface ItemProps {
  item: IQuestion
}
export default function ItemQuestion({ item }: ItemProps) {
  const isAnswered = item?.isAnswered
  return (
    <Card
      onPress={() => {
        navigate("DetailQuestion", {
          id: item.id,
        })
      }}
      mode="contained"
      style={styles.item}
    >
      <List.Item
        left={() => {
          return <Image source={R.images.ic_question} style={styles.icon} />
        }}
        style={{ paddingBottom: 0 }}
        title={() => {
          return (
            <View>
              <Text size="ba" weight="medium" style={{ color: colors.gray_9 }}>
                {item?.title}
              </Text>
            </View>
          )
        }}
      />
      <Text size="sm" weight="normal" style={styles.textTime}>
        {moment(item?.createdAt).format("DD/MM/YYYY")}
      </Text>
      {isAnswered ? (
        <>
          <Divider style={{ marginVertical: HEIGHT(10), marginLeft: WIDTH(spacing.sm) }} />
          <Text
            size="ba"
            weight="normal"
            style={{ color: colors.gray_6, marginLeft: WIDTH(spacing.sm) }}
          >
            Trả lời:
            <Text size="ba" style={{ color: colors.gray_9 }}>
              {" "}
              Bác sĩ {item?.doctorName}
            </Text>
          </Text>
        </>
      ) : (
        <>
          <Divider style={{ marginVertical: HEIGHT(10), marginLeft: WIDTH(spacing.sm) }} />
          <Text size="ba" weight="normal" style={styles.textWaiting}>
            Chờ bác sĩ trả lời
          </Text>
        </>
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.sm),
    paddingRight: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
    marginHorizontal: WIDTH(spacing.md),
  },
  icon: {
    width: WIDTH(24),
    height: WIDTH(24),
    alignSelf: "center",
    marginLeft: WIDTH(spacing.sm),
  },
  textTime: { color: colors.gray_6, textAlign: "right" },
  textWaiting: { color: colors.orange_7, marginLeft: WIDTH(spacing.sm), alignSelf: "center" },
})
