import { Pressable, ScrollView, StyleSheet, View, Image } from "react-native"
import React from "react"
import { Text } from "@app/components/Text"
import { HEIGHT, WIDTH } from "@app/config/functions"
import { spacing } from "@app/theme/spacing"
import colors from "@app/assets/colors"
import { Icon } from "@app/components/Icon"
import DocumentPicker, { isCancel, isInProgress, types } from "react-native-document-picker"
import { IconButton } from "react-native-paper"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { translate } from "@app/i18n/translate"
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
        const newList = [...listImage, ...val]
        setListImage(newList)
      })
      .catch(handleError)
  }
  const onDeleteImage = (index) => {
    const newArray = [...listImage] // Create a copy of the current array
    newArray.splice(index, 1) // Remove the item at index i
    setListImage(newArray) // Update the state with the new array
  }
  return (
    <View style={styles.container}>
      <Text preset="formLabel">{translate("common.file_attach")}</Text>
      {listImage.length === 0 ? (
        <Pressable onPress={onPickFile} style={styles.card}>
          <View style={styles.boxIcon}>
            <Icon icon="directbox_send" size={WIDTH(24)} color={colors.gray_5} />
          </View>
          <Text size="sm" weight="normal" style={{ color: colors.gray_7 }}>
            {translate("booking.file_attach_desc")}
          </Text>
        </Pressable>
      ) : (
        <ScrollView horizontal>
          <View style={styles.wrapperImage}>
            {listImage.map((item, index) => {
              return (
                <View key={index}>
                  <Image style={styles.image} source={{ uri: item.uri }} />
                  <Pressable
                    style={styles.icClose}
                    onPress={() => {
                      onDeleteImage(index)
                    }}
                  >
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      color={colors.gray_7}
                      size={WIDTH(20)}
                    />
                  </Pressable>
                </View>
              )
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
  boxIcon: {
    alignItems: "center",
    backgroundColor: colors.gray_0,
    borderRadius: WIDTH(20),
    height: WIDTH(40),
    justifyContent: "center",
    marginBottom: HEIGHT(4),
    width: WIDTH(40),
  },
  buttonUpload: {
    alignItems: "center",
    backgroundColor: colors.gray_2,
    borderRadius: 8,
    height: HEIGHT(140),
    justifyContent: "center",
    marginRight: WIDTH(spacing.xs),
    marginTop: WIDTH(spacing.xs),
    width: WIDTH(109),
  },
  card: {
    alignItems: "center",
    borderColor: colors.gray_3,
    borderRadius: WIDTH(8),
    borderStyle: "dashed",
    borderWidth: 1,
    justifyContent: "center",
    marginTop: HEIGHT(spacing.md),
    paddingVertical: HEIGHT(spacing.sm),
  },
  container: {
    marginTop: HEIGHT(spacing.md),
  },
  icClose: {
    position: "absolute",
    right: WIDTH(spacing.sm),
    top: HEIGHT(spacing.md),
  },
  image: {
    borderRadius: 8,
    height: HEIGHT(140),
    marginRight: WIDTH(spacing.xs),
    marginTop: WIDTH(spacing.xs),
    width: WIDTH(109),
  },
  wrapperImage: { alignItems: "center", flexDirection: "row", marginBottom: HEIGHT(spacing.md) },
})
