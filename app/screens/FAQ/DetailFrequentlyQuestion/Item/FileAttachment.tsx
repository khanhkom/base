import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import React from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"

export default function FileAttachment() {
  return (
    <ScrollView horizontal>
      {[1, 2, 3, 4, 5].map((item, index) => {
        return (
          <Image
            source={{
              uri: "https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*",
            }}
            style={styles.image}
            key={index}
          />
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: WIDTH(101),
    height: HEIGHT(130),
    borderRadius: 8,
    marginRight: WIDTH(spacing.xs),
    marginTop: HEIGHT(spacing.sm),
  },
})
