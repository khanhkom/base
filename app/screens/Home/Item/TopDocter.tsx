import { FlatList, StyleSheet, View, Image, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { Text } from "@app/components/Text"
import { Icon } from "@app/components/Icon"
import { spacing } from "@app/theme/spacing"
import { Card } from "react-native-paper"
import R from "@app/assets"
import colors from "@app/assets/colors"
import { getListDocter } from "@app/services/api/functions/docter"
import { IDocter } from "@app/interface/docter"
import ItemPlaceholder from "@app/components/ItemPlaceholder"
import { navigate } from "@app/navigators/navigationUtilities"
const Item = ({ item, index }: { item: IDocter; index: number }) => {
  return (
    <Card
      onPress={() => {
        navigate("DocterInformation", {
          item,
          preScreen: "Home",
        })
      }}
      mode="contained"
      style={styles.item}
    >
      <Image
        source={item?.avatarUrl !== "" ? { uri: item?.avatarUrl } : R.images.avatar_docter}
        style={styles.avatar}
        resizeMode="contain"
      />
      <Text weight="medium" size="ba" style={styles.textName}>
        B.s {item?.name}
      </Text>
      <Text weight="normal" size="sm" style={styles.textDes}>
        {item?.specialist?.[0]?.value ?? ""}
      </Text>
      {item?.averageRating > 0 && (
        <View style={styles.wrapperStar}>
          <Icon icon="ic_start" size={WIDTH(16)} />
          <Text weight="medium" size="xs" style={{ color: colors.gray_9 }}>
            {item?.averageRating ?? 0}{" "}
          </Text>
          <Text weight="normal" size="xs" style={{ color: colors.gray_7 }}>
            ({item?.countRating ?? 0})
          </Text>
        </View>
      )}
    </Card>
  )
}
export default function TopDocter() {
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Function to fetch the list of doctors from the API
    const getListDoctorAPI = async () => {
      try {
        const resData = await getListDocter({
          page: 1,
          perPage: 4,
          sortByRatings: -1,
        })

        setDoctors(resData?.data?.items ?? [])
        setIsLoading(false) // Set isLoading to false after data is fetched
      } catch (error) {
        console.error(error)
      }
    }

    // Call the getListDoctor function when the component mounts
    getListDoctorAPI()
  }, [])
  return (
    <View>
      <Pressable
        onPress={() => {
          navigate("SearchDocter", {
            preScreen: "Home",
          })
        }}
        style={styles.flexRow}
      >
        <Text weight="semiBold" size="xl">
          Top Bác sĩ
        </Text>
        <Icon icon="arrow_circle_right" size={WIDTH(24)} />
      </Pressable>
      {isLoading ? (
        <View>
          <ItemPlaceholder />
          <ItemPlaceholder />
        </View>
      ) : (
        <FlatList
          style={{ paddingLeft: WIDTH(spacing.md), marginTop: HEIGHT(spacing.sm) }}
          horizontal
          data={doctors}
          renderItem={({ item, index }) => {
            return <Item item={item} index={index} />
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(32),
  },
  item: {
    marginRight: WIDTH(spacing.md),
    width: WIDTH(162),
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  avatar: {
    height: WIDTH(72),
    width: WIDTH(72),
    borderRadius: 12,
    alignSelf: "center",
  },
  textName: {
    color: colors.gray_9,
    marginTop: HEIGHT(8),
    marginBottom: HEIGHT(2),
    textAlign: "center",
    marginHorizontal: WIDTH(spacing.md),
  },
  textDes: { color: colors.gray_6, textAlign: "center" },
  wrapperStar: {
    paddingVertical: HEIGHT(2),
    paddingHorizontal: WIDTH(4),
    borderRadius: 20,
    backgroundColor: colors.yellow_0,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: HEIGHT(spacing.xs),
  },
})
