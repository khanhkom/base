import { StyleSheet, View, Image, TouchableWithoutFeedback, Keyboard } from "react-native"
import React, { useState } from "react"
import { Header } from "@app/components/Header"
import colors from "@app/assets/colors"
import { HEIGHT, WIDTH } from "@app/config/functions"
import R from "@app/assets"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { TextField } from "@app/components/TextField"
import { Button } from "react-native-paper"
import ItemTotalStar from "./Item/ItemTotalStar"
import { EToastType, showToastMessage } from "@app/utils/library"
import { sendRatingOrder } from "@app/services/api/functions/rating"
import { goBack } from "@app/navigators/navigationUtilities"
import { getOrderHistory } from "@app/redux/actions/actionOrder"
import { useDispatch } from "react-redux"
import { translate } from "@app/i18n/translate"

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
        avatarUrl: string
      }
      reloadData: () => void
    }
  }
}
export default function RatingDocter({ route }: IScreenParams) {
  const [star, setStar] = useState(0)
  const [listCriteria, setListCriteria] = useState([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [error, setError] = useState(false)
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
      showToastMessage(translate("rating.please_select_star"), EToastType.ERROR)
    } else if (description?.trim() === "") {
      setError(true)
    } else {
      setError(false)
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
      console.log("resRating::", resRating)
      dispatch(getOrderHistory())
      if (resRating.status === 201) {
        showToastMessage(translate("rating.sent_rating_success"), EToastType.SUCCESS)
        goBack()
        route?.params?.reloadData?.()
      } else {
        showToastMessage(translate("rating.sent_rating_fail"), EToastType.ERROR)
      }
      setLoading(false)
    }
  }
  const doctor = route?.params?.doctor
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <View style={styles.container}>
        <Header
          leftIcon="arrow_left"
          title={translate("rating.rating_doctor")}
          backgroundColor={colors.white}
        />
        <Image
          source={
            doctor?.avatarUrl !== ""
              ? {
                  uri: doctor?.avatarUrl,
                }
              : R.images.avatar_docter_rec
          }
          style={styles.imageDocter}
          resizeMode="contain"
        />
        <Text size="xxl" weight="semiBold" style={styles.doctorName}>
          {translate("doctor.doctor")} {doctor?.name ?? ""}
        </Text>
        <Text size="md" weight="normal" style={styles.textDesc}>
          {translate("rating.do_you_satisfy")}
        </Text>
        <ItemTotalStar star={star} setStar={setStar} />
        <TextField
          placeholder={translate("rating.share_your_feel")}
          style={{ minHeight: HEIGHT(120) }}
          containerStyle={{ width: WIDTH(343), marginTop: HEIGHT(32) }}
          inputWrapperStyle={error && { borderColor: colors.red_6 }}
          textAlignVertical="top"
          onChangeText={(text) => {
            setDescription(text)
            if (error) {
              setError(false)
            }
          }}
          multiline
          require
          helper={error && "Vui lòng nhập cảm nhận!"}
          HelperTextProps={{ style: { color: colors.red_6 } }}
        />
        <Text
          size="ba"
          weight="medium"
          style={{ color: colors.gray_9, marginVertical: HEIGHT(spacing.md) }}
        >
          {translate("rating.you_can_choose_more_option")}
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
            {translate("booking.button.send_rating")}
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
