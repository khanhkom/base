import { StyleSheet, Image, View, FlatList, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import R from "@app/assets"
import { HEIGHT, WIDTH, convertDuration } from "@app/config/functions"
import { Text } from "@app/components/Text"
import { Card, List } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { navigate } from "@app/navigators/navigationUtilities"
import { Icon } from "@app/components/Icon"
import useHookHome from "../useHookHome"
import { translate } from "@app/i18n/translate"
import { getOrderBeingServiced } from "@app/services/api/functions/order"
import moment from "moment"
const TYPE_FEATURES = {
  DATLICH: 0,
  TUVAN: 1,
  HOIDAP: 2,
  KETQUA: 3,
  NHATHUOC: 4,
  KIENTHUC: 5,
}
const DATA_FEATURES = [
  {
    id: TYPE_FEATURES.DATLICH,
    title: translate("home.schedule_clinics"),
    image: R.images.ic_khamlai,
  },
  {
    id: TYPE_FEATURES.TUVAN,
    title: translate("home.online_consultations"),
    image: R.images.ic_tuvan,
  },
  {
    id: TYPE_FEATURES.HOIDAP,
    title: translate("home.community_qa"),
    image: R.images.ic_hoidap,
  },
  {
    id: TYPE_FEATURES.KETQUA,
    title: translate("home.medical_test_results"),
    image: R.images.ic_ketqua,
  },
  {
    id: TYPE_FEATURES.NHATHUOC,
    title: translate("home.pharmacy"),
    image: R.images.ic_nhathuoc,
  },
  {
    id: TYPE_FEATURES.KIENTHUC,
    title: translate("home.first_aid_knowledge"),
    image: R.images.ic_kienthuc,
  },
]
const Item = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Image source={item.image} style={styles.icFeature} />
      <Text weight="normal" size="sm" style={styles.title}>
        {item.title}
      </Text>
    </Pressable>
  )
}
export default function ItemUtilities() {
  const [nearestOrder, setNearestOrder] = useState({ timeDifference: 0 })
  const [timeFromNow, setTimeFromNow] = useState(convertDuration(nearestOrder?.timeDifference))
  const [isBeforeNow, setIsBeforeNow] = useState(true)

  useEffect(() => {
    async function getOrderNearest() {
      const nearestOrderTemp = await getOrderBeingServiced()
      console.log("nearestOrderTemp", nearestOrderTemp?.data)
      if (nearestOrderTemp?.data?.id) {
        const dataOrder = nearestOrderTemp?.data
        const timeDifference = await moment(nearestOrderTemp.data.timeRange?.from).diff(new Date())
        let isBefore = await moment(nearestOrderTemp.data.timeRange?.to).isBefore(new Date())
        console.log("isBefore_isBefore", isBefore)
        setIsBeforeNow(isBefore)
        Object.assign(dataOrder, { timeDifference })
        setTimeFromNow(convertDuration(timeDifference))
        setNearestOrder(dataOrder)
      } else {
        console.log("none_order")
      }
    }
    getOrderNearest()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeFromNow(convertDuration(nearestOrder?.timeDifference))
    }, 60000) // 1 minute in milliseconds

    // return () => {
    //   clearInterval(interval)
    // } // Clear the interval when component unmounts
  }, [nearestOrder])

  const onPresItem = (index) => {
    switch (index) {
      case TYPE_FEATURES.TUVAN:
        navigate("CousultOnline")
        break
      case TYPE_FEATURES.KETQUA:
        navigate("SelectPatientHistory")
        break
      case TYPE_FEATURES.HOIDAP:
        navigate("CommunityFAQ")
        break

      default:
        break
    }
  }
  console.log("timeToNow_timeToNow", isBeforeNow)
  return (
    <Card style={styles.card}>
      <FlatList
        data={DATA_FEATURES}
        numColumns={3}
        renderItem={({ item, index }) => {
          return <Item item={item} onPress={() => onPresItem(index)} />
        }}
        ItemSeparatorComponent={() => <View style={{ height: HEIGHT(spacing.md) }} />}
      />
      {nearestOrder?.id && !isBeforeNow && (
        <List.Item
          style={styles.itemRemind}
          onPress={() => {
            navigate("DetailBooking", {
              id: nearestOrder?.id,
            })
          }}
          title={() => {
            return (
              <Text size="sm" weight="medium" style={{ color: colors.white }}>
                {timeFromNow?.day <= 0 && timeFromNow.hour <= 0 && timeFromNow.min <= 0
                  ? translate("home.time_to_exam")
                  : `${translate("home.have_exam_in_next")} ${timeFromNow?.hour} ${translate(
                      "home.hour",
                    )} ${timeFromNow?.min} ${translate("home.minute")}`}
              </Text>
            )
          }}
          left={() => {
            return (
              <Image
                source={R.images.call_reminder}
                style={styles.iconRemind}
                resizeMode="contain"
              />
            )
          }}
          right={() => {
            return <Icon icon="arrow_right_full" size={WIDTH(28)} />
          }}
        />
      )}
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginHorizontal: WIDTH(spacing.md),
    marginTop: -HEIGHT(85),
    paddingHorizontal: WIDTH(spacing.sm),
    paddingVertical: HEIGHT(spacing.sm),
  },
  icFeature: {
    height: WIDTH(36),
    marginBottom: HEIGHT(6),
    width: WIDTH(36),
  },
  iconRemind: {
    height: HEIGHT(32),
    width: WIDTH(44),
  },
  item: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  itemRemind: {
    backgroundColor: colors.main_7,
    borderRadius: 12,
    marginTop: HEIGHT(spacing.md),
    paddingLeft: WIDTH(spacing.sm),
    paddingRight: WIDTH(8),
  },
  title: { textAlign: "center", width: WIDTH(96) },
})
