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
import ItemTotalStar from "./Item/ItemTotalStar"
import { EToastType, showToastMessage } from "@app/utils/library"
import { sendRatingOrder } from "@app/services/api/functions/rating"
import { goBack } from "@app/navigators/navigationUtilities"
import { getOrderHistory } from "@app/redux/actions/actionOrder"
import { useDispatch } from "react-redux"

const LIST_DEFAULT_RATING = [
  "Chuyên môn tốt",
  "Giao tiếp thân thiện",
  "Tư vấn tận tình",
  "Phản hồi nhanh",
]
interface IScreenParams {
  route: {
    params: {
      id: string
      doctor: {
        id: string
        name: string
      }
    }
  }
}
export default function RatingDocter({ route }: IScreenParams) {
  const [star, setStar] = useState(0)
  const [listCriteria, setListCriteria] = useState([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")
  const dispatch = useDispatch()
  const onPressCriteria = (index) => {
    if (listCriteria.includes(index)) {
      const newList = listCriteria?.filter((it) => it !== index)
      setListCriteria(newList)
    } else {
      setListCriteria([...listCriteria, index])
    }
  }
  const onSubmitRating = async () => {
    if (star === 0) {
      showToastMessage("Vui lòng chọn điểm đánh giá", EToastType.ERROR)
    } else {
      setLoading(true)
      const criteria = []
      LIST_DEFAULT_RATING.forEach((it, index) => {
        if (listCriteria.includes(index)) {
          criteria.push(it.toLowerCase())
        }
      })
      const body = {
        orderId: route?.params?.id,
        description: description,
        criteria: criteria,
        score: star,
      }
      let resRating = await sendRatingOrder(body)
      dispatch(getOrderHistory())
      if (resRating.status === 201) {
        showToastMessage("Gửi đánh giá thành công", EToastType.SUCCESS)
        goBack()
      } else {
        showToastMessage("Gửi đánh giá thất bại! Vui lòng thử lại!", EToastType.ERROR)
      }
      console.log("resRating_resRating", resRating, body)
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <Header leftIcon="arrow_left" title="Đánh giá bác sĩ" backgroundColor={colors.white} />
      <Image source={R.images.avatar_docter_rec} style={styles.imageDocter} />
      <Text size="xxl" weight="semiBold" style={styles.doctorName}>
        B.s {route?.params?.doctor?.name ?? ""}
      </Text>
      <Text size="md" weight="medium" style={styles.textDesc}>
        {"Bạn có hài lòng với cuộc tư vấn?\nHãy cho chúng tôi biết ý kiến của bạn!"}
      </Text>
      <ItemTotalStar star={star} setStar={setStar} />
      <TextField
        placeholder="Chia sẻ thêm cảm nhận của bạn"
        style={{ minHeight: HEIGHT(120) }}
        containerStyle={{ width: WIDTH(343), marginTop: HEIGHT(32) }}
        onChangeText={setDescription}
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
          const isActive = listCriteria.includes(index)
          return (
            <Button
              key={index}
              mode="contained"
              buttonColor={isActive ? colors.primary : colors.gray_1}
              textColor={isActive ? colors.white : colors.gray_9}
              onPress={() => onPressCriteria(index)}
              style={styles.buttonReviewSuggest}
            >
              {item}
            </Button>
          )
        })}
      </View>
      <View style={styles.bottomButton}>
        <Button loading={loading} style={styles.button} mode="contained" onPress={onSubmitRating}>
          Gửi đánh giá
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomButton: {
    bottom: 0,
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
    position: "absolute",
    width: "100%",
  },
  doctorName: { color: colors.gray_9, textAlign: "center" },
  button: {
    borderRadius: 8,
    flex: 1,
  },
  buttonReviewSuggest: {
    marginBottom: HEIGHT(spacing.sm),
    marginLeft: WIDTH(spacing.md),
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flex: 1,
  },
  flexWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageDocter: {
    borderRadius: 12,
    height: HEIGHT(138),
    marginBottom: HEIGHT(spacing.sm),
    marginTop: HEIGHT(spacing.xs),
    width: WIDTH(103.5),
  },
  textDesc: {
    color: colors.gray_9,
    marginTop: HEIGHT(spacing.xs),
    textAlign: "center",
    width: WIDTH(289),
  },
})
