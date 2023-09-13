import { StyleSheet, View, Image } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import R from "@app/assets"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { Icon } from "@app/components/Icon"
import { TextField } from "@app/components/TextField"
import { Button } from "react-native-paper"
const ItemTotalStar = ({ star, setStar }: { star: number; setStar: (val: number) => void }) => {
  return (
    <View style={styles.flexRowStar}>
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <Icon
            icon="ic_start"
            size={WIDTH(48)}
            onPress={() => setStar(index)}
            key={index}
            color={index <= star ? colors.yellow_6 : colors.gray_4}
          />
        )
      })}
    </View>
  )
}
const LIST_DEFAULT_RATING = [
  "Chuyên môn tốt",
  "Giao tiếp thân thiện",
  "Tư vấn tận tình",
  "Phản hồi nhanh",
]
export default function RatingDocter() {
  const [star, setStar] = useState(0)
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Đánh giá bác sĩ" backgroundColor={colors.white} />
      <Image source={R.images.avatar_docter_rec} style={styles.imageDocter} />
      <Text size="xxl" weight="semiBold" style={{ color: colors.gray_9, textAlign: "center" }}>
        B.s Nguyễn Văn A
      </Text>
      <Text size="md" weight="medium" style={styles.textDesc}>
        Bạn có hài lòng với cuộc tư vấn? Hãy cho chúng tôi biết ý kiến của bạn!
      </Text>
      <ItemTotalStar star={star} setStar={setStar} />
      <TextField
        multiline
        placeholder="Chia sẻ thêm cảm nhận của bạn"
        containerStyle={{ width: WIDTH(343), marginTop: HEIGHT(32) }}
      />
      <Text
        size="ba"
        weight="medium"
        style={{ color: colors.gray_9, marginVertical: HEIGHT(spacing.md) }}
      >
        Bạn có thể chọn nhiều hơn một tiêu chí đánh giá
      </Text>
      <View style={styles.flexWrap}>
        {LIST_DEFAULT_RATING.map((item, index) => {
          return (
            <Button
              key={index}
              mode="contained"
              buttonColor={colors.gray_1}
              textColor={colors.gray_9}
              style={styles.buttonReviewSuggest}
            >
              {item}
            </Button>
          )
        })}
      </View>
      <View style={styles.bottomButton}>
        <Button style={styles.button} mode="contained">
          Gửi đánh giá
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  imageDocter: {
    height: HEIGHT(138),
    width: WIDTH(103.5),
    borderRadius: 12,
    marginTop: HEIGHT(spacing.xs),
    marginBottom: HEIGHT(spacing.sm),
  },
  textDesc: {
    marginTop: HEIGHT(spacing.xs),
    color: colors.gray_9,
    textAlign: "center",
    width: WIDTH(289),
  },
  flexRowStar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: HEIGHT(spacing.lg),
    width: WIDTH(304),
    justifyContent: "space-between",
  },
  bottomButton: {
    position: "absolute",
    bottom: 0,
    paddingVertical: HEIGHT(spacing.sm),
    paddingHorizontal: WIDTH(spacing.md),
    width: "100%",
  },
  button: {
    borderRadius: 8,
    flex: 1,
  },
  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonReviewSuggest: {
    marginLeft: WIDTH(spacing.md),
    marginBottom: HEIGHT(spacing.sm),
  },
})
