import { StyleSheet, Image, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { getNameById } from "@app/services/api/functions/stringee"
export default function ItemUserTarget({ isIncoming, doctorName, fromAlias }) {
  return (
    <View>
      <Image source={R.images.call_avatar} style={styles.imageCalling} />
      {!isIncoming ? (
        <View>
          <Text size="xxl" weight="semiBold" style={styles.textName}>
            B.s {doctorName}
          </Text>
          <Text size="sm" weight="normal" style={styles.textStatus}>
            Đang kết nối...
          </Text>
        </View>
      ) : (
        <View>
          <Text size="xxl" weight="semiBold" style={styles.textName}>
            B.s {fromAlias}
          </Text>
          <Text size="sm" weight="normal" style={styles.textStatus}>
            Đang gọi cho bạn
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  textStatus: {
    color: colors.gray_3,
    textAlign: "center",
    marginTop: HEIGHT(spacing.md),
  },
  textName: { color: colors.white, textAlign: "center" },
  imageCalling: {
    width: WIDTH(240),
    height: WIDTH(240),
    alignSelf: "center",
    marginTop: HEIGHT(80),
  },
})
