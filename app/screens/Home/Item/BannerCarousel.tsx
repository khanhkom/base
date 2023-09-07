import { Dimensions, StyleSheet, Image, View } from "react-native"
import React, { useState } from "react"
import Carousel from "react-native-reanimated-carousel"
import R from "@app/assets"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
export default function BannerCarousel() {
  const width = Dimensions.get("window").width
  const [index, setIndex] = useState(0)
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={WIDTH(120)}
        autoPlay={true}
        data={[...new Array(3).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(id) => setIndex(id)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={R.images.banner1} style={styles.image} resizeMode="contain" />
          </View>
        )}
      />
      <View style={styles.flexRow}>
        {[...new Array(3).keys()].map((item, id) => {
          return <View key={id} style={id === index ? styles.activeDot : styles.dot} />
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: WIDTH(343),
    height: WIDTH(120),
  },
  container: {
    marginTop: HEIGHT(spacing.lg),
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginTop: -HEIGHT(20),
    marginHorizontal: WIDTH(3),
  },
  activeDot: {
    height: 5,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
    marginTop: -HEIGHT(20),
    marginHorizontal: WIDTH(3),
  },
})
