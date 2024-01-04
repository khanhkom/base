import { StyleSheet, View, Image } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import R from "@app/assets"
import { Button } from "react-native-paper"
import { navigate } from "@app/navigators/navigationUtilities"
export default function EmptyMess() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={R.images.empty_chat} />
      <Text size="xl" weight="semiBold" style={styles.title}>
        Không tìm thấy tin nhắn nào
      </Text>
      <Text size="ba" weight="normal" style={styles.desc}>
        Sau khi đặt lịch thành công, bệnh nhân có thể chủ động liên hệ với bác sĩ để giải đáp thắc
        mắc góp phần nâng cao chất lượng tư vấn
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          navigate("CousultOnline")
        }}
      >
        Đặt lịch ngay
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: WIDTH(spacing.md),
    justifyContent: "center",
    alignItems: "center",
    paddingTop: HEIGHT(spacing.xxxl),
  },
  button: {
    width: WIDTH(343),
    borderRadius: WIDTH(8),
  },
  image: {
    width: WIDTH(132),
    height: WIDTH(132),
  },
  title: { color: colors.gray_9, marginBottom: HEIGHT(spacing.xs), textAlign: "center" },
  desc: { color: colors.gray_7, marginBottom: HEIGHT(spacing.lg), textAlign: "center" },
})
