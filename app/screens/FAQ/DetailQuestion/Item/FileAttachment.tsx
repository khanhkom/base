import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import ImageView from "react-native-image-viewing"

export default function FileAttachment({ data }: { data: string[] }) {
  const [visible, setIsVisible] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  return (
    <View>
      <ScrollView horizontal>
        {data.map((item, index) => {
          return (
            <Pressable
              onPress={() => {
                setImageIndex(index)
                setIsVisible(true)
              }}
              key={index}
            >
              <Image
                source={{
                  uri: item,
                }}
                style={styles.image}
              />
            </Pressable>
          )
        })}
      </ScrollView>
      <ImageView
        images={data?.map((item) => {
          return { uri: item }
        })}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
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
