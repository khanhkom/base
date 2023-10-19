import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { List } from "react-native-paper"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { Icon } from "@app/components/Icon"
import { navigate } from "@app/navigators/navigationUtilities"

export default function ItemConversation({ index }) {
  const inActive = index === 2
  return (
    <List.Item
      style={styles.item}
      onPress={() => {
        navigate("DetailConversation")
      }}
      left={() => {
        return (
          <View>
            <Image source={R.images.avatar_docter} style={styles.avatar} />
            <View style={[styles.status, inActive && { backgroundColor: colors.gray_3 }]} />
          </View>
        )
      }}
      title={() => {
        return (
          <View>
            <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
              B.s Nguyễn Văn A
            </Text>
            <Text size="ba" weight="normal" style={{ color: colors.gray_9 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry...
            </Text>
            <Text size="sm" weight="normal" style={{ color: colors.gray_5, textAlign: "right" }}>
              13:03
            </Text>
            <View style={styles.bagde}>
              {inActive ? (
                <Icon icon="tick_circle" size={WIDTH(18)} color={colors.gray_4} />
              ) : (
                <View style={styles.viewBagde}>
                  <Text size="sm" weight="medium" style={{ color: colors.white }}>
                    {index + 1}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.sm),
    borderRadius: WIDTH(12),
    paddingRight: WIDTH(spacing.sm),
  },
  avatar: {
    height: WIDTH(48),
    width: WIDTH(48),
    borderRadius: WIDTH(24),
    marginLeft: WIDTH(spacing.sm),
  },
  status: {
    backgroundColor: colors.green_6,
    height: WIDTH(10),
    width: WIDTH(10),
    borderRadius: 10,
    position: "absolute",
    right: WIDTH(0),
    top: WIDTH(5),
    borderWidth: 1,
    borderColor: colors.white,
  },
  bagde: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  viewBagde: {
    backgroundColor: colors.red_5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: WIDTH(6),
  },
})
