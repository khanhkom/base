import { StyleSheet, Image, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import R from "@app/assets"
export default function Banner() {
  return (
    <View style={styles.container}>
      <View>
        <Image source={R.images.datlich_success} style={styles.image} />
        <Image source={R.images.ic_datlich_1} style={styles.image1} />
        <Image source={R.images.ic_datlich_2} style={styles.image2} />
        <Image source={R.images.ic_datlich_3} style={styles.image3} />
        <Image source={R.images.ic_datlich_4} style={styles.image4} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: HEIGHT(32),
    paddingBottom: HEIGHT(16),
  },
  image: {
    height: WIDTH(190),
    width: WIDTH(200),
  },
  image1: {
    height: WIDTH(48),
    width: WIDTH(48),
    position: "absolute",
    top: -HEIGHT(4),
    left: -WIDTH(24),
  },
  image2: {
    height: WIDTH(36),
    width: WIDTH(36),
    top: HEIGHT(20),
    right: -WIDTH(36),
    position: "absolute",
  },
  image3: {
    height: WIDTH(30),
    width: WIDTH(30),
    position: "absolute",
    bottom: HEIGHT(36),
    left: 0,
  },
  image4: {
    height: WIDTH(32),
    width: WIDTH(32),
    position: "absolute",
    bottom: HEIGHT(18),
    right: -WIDTH(30),
  },
})
