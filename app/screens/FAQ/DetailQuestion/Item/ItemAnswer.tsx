import { StyleSheet, View, Image } from "react-native"
import React, { memo } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { List } from "react-native-paper"
import R from "@app/assets"
import { IQuestion } from "@app/interface/question"
import FileAttachment from "./FileAttachment"
const ItemAnswer = ({ item }: { item: IQuestion }) => {
  console.log("item::", item)
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text size="ba" weight="medium" style={{ color: colors.white }}>
          Trả lời bởi:
        </Text>
        <List.Item
          style={{ paddingBottom: 0 }}
          title={() => {
            return (
              <View>
                <Text size="md" weight="medium" style={{ color: colors.white }}>
                  B.s {item?.doctorName}
                </Text>
                <Text size="sm" weight="normal" style={{ color: colors.primary_3 }}>
                  Khoa: {item?.doctorSpecialist?.[0]?.value}
                </Text>
              </View>
            )
          }}
          left={() => {
            return (
              <Image
                source={
                  item?.doctorAvatarUrl
                    ? {
                        uri:
                          "https://sanreview-backend.s3.ap-southeast-1.amazonaws.com/" +
                          item?.doctorAvatarUrl,
                      }
                    : R.images.avatar_docter
                }
                style={styles.avatar}
              />
            )
          }}
        />
        <Image source={R.images.background_item} style={styles.background} />
      </View>
      <View style={styles.content}>
        <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
          {item?.answer}
        </Text>
        {/* <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book.
        </Text> */}
        <FileAttachment data={item?.doctorFiles ?? []} />
      </View>
    </View>
  )
}
export default memo(ItemAnswer)
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: HEIGHT(spacing.sm),
  },
  card: {
    backgroundColor: colors.primary_8,
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },
  content: {
    paddingTop: HEIGHT(spacing.xs),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingBottom: HEIGHT(spacing.sm),
  },
  avatar: {
    height: WIDTH(64),
    width: WIDTH(64),
    borderRadius: 8,
  },
  background: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: WIDTH(80),
  },
})
