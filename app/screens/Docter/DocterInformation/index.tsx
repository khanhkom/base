import { Platform, ScrollView, StyleSheet, View } from "react-native"
import React, { useEffect, useState } from "react"
import { Header, Screen } from "@app/components/index"
import colors from "@app/assets/colors"
import GeneralInfor from "./Item/GeneralInfor"
import Experience from "./Item/Experience"
import Rating from "./Item/Rating"
import { HEIGHT, WIDTH, getWidth } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import { Button } from "react-native-paper"
import { goBack, navigate } from "@app/navigators/navigationUtilities"
import { IDocter } from "@app/interface/docter"
import { getDetailDocter } from "@app/services/api/functions/docter"
import { useDispatch } from "react-redux"
import { updateDocterCreateOrder } from "@app/redux/actions/actionOrder"
import { translate } from "@app/i18n/translate"
interface IScreenProps {
  route: {
    params: {
      item: IDocter
      preScreen?: string
    }
  }
}
export default function DocterInformation({ route }: IScreenProps) {
  const [loading, setLoading] = useState(false)
  const [detailDocter, setDetailDocter] = useState<IDocter>()
  const doctorId = route.params?.item?.id
  const userId = route.params?.item?.userId
  console.log("detailDocter_detailDocter", detailDocter)
  const loadDetailDocter = async () => {
    setLoading(true)
    let resDetail = await getDetailDocter(doctorId)
    setDetailDocter(resDetail.data)
    setLoading(false)
  }
  useEffect(() => {
    loadDetailDocter()
  }, [])
  const dispatch = useDispatch()
  return (
    <Screen
      safeAreaEdges={Platform.OS === "android" ? ["bottom"] : []}
      contentContainerStyle={styles.container}
    >
      <Header leftIcon="arrow_left" title="Thông tin bác sĩ" backgroundColor={colors.gray_1} />
      <ScrollView>
        <GeneralInfor data={detailDocter} />
        <Experience data={detailDocter} />
        <Rating
          averageRating={detailDocter?.averageRating}
          countRating={detailDocter?.countRating}
          userId={userId}
        />
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => {
            dispatch(updateDocterCreateOrder(detailDocter))
            if (route?.params?.preScreen) {
              goBack()
              goBack()
            } else {
              navigate("SelectCalendar")
            }
          }}
        >
          {translate("booking.book")}
        </Button>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray_1,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: getWidth(),
    paddingVertical: HEIGHT(spacing.sm),
    backgroundColor: colors.white,
    paddingHorizontal: WIDTH(spacing.md),
  },
  button: {
    borderRadius: 8,
  },
})
