import { Pressable, ScrollView, StyleSheet, View, Image } from "react-native"
import React, { useState } from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import DocumentPicker, { isCancel, isInProgress, types } from "react-native-document-picker"
import { IconButton } from "react-native-paper"
export default function FileAttachment({ listImage, setListImage }) {
  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn("cancelled")
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn("multiple pickers were opened, only the last will be considered")
    } else {
      throw err
    }
  }

  const onPickFile = () => {
    DocumentPicker.pick({
      allowMultiSelection: true,
      type: [types.images, types.docx],
    })
      .then((val) => {
        console.log("val_val", val)
        const newList = [...listImage, ...val]
        setListImage(newList)
      })
      .catch(handleError)
  }
  console.log("listImage", listImage)
  return (
    <View style={styles.container}>
      <Text preset="formLabel">Tệp đính kèm</Text>
      {listImage.length === 0 ? (
        <Pressable onPress={onPickFile} style={styles.card}>
          <View style={styles.boxIcon}>
            <Icon icon="directbox_send" size={WIDTH(24)} color={colors.gray_5} />
          </View>
          <Text size="sm" weight="normal" style={{ color: colors.gray_7 }}>
            Tải lên hồ sơ bệnh án, đơn thuốc (nếu có)
          </Text>
        </Pressable>
      ) : (
        <ScrollView horizontal>
          <View style={styles.wrapperImage}>
            {listImage.map((item, index) => {
              return <Image key={index} style={styles.image} source={{ uri: item.uri }} />
            })}
            <Pressable onPress={onPickFile} style={styles.buttonUpload}>
              <IconButton icon="upload" iconColor={colors.gray_5} />
            </Pressable>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: HEIGHT(spacing.md),
  },
  card: {
    borderRadius: WIDTH(8),
    borderWidth: 1,
    borderColor: colors.gray_3,
    marginTop: HEIGHT(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
  },
  boxIcon: {
    width: WIDTH(40),
    height: WIDTH(40),
    borderRadius: WIDTH(20),
    backgroundColor: colors.gray_0,
    marginBottom: HEIGHT(4),
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperImage: { flexDirection: "row", alignItems: "center", marginBottom: HEIGHT(spacing.md) },
  image: {
    height: HEIGHT(140),
    width: WIDTH(109),
    borderRadius: 8,
    marginRight: WIDTH(spacing.xs),
    marginTop: WIDTH(spacing.xs),
  },
  buttonUpload: {
    height: HEIGHT(140),
    width: WIDTH(109),
    borderRadius: 8,
    marginRight: WIDTH(spacing.xs),
    marginTop: WIDTH(spacing.xs),
    backgroundColor: colors.gray_2,
    justifyContent: "center",
    alignItems: "center",
  },
})
