import React, { forwardRef, useImperativeHandle, useState } from "react"
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  StatusBar,
  Modal,
  TouchableOpacity,
} from "react-native"
import { WIDTH, HEIGHT, getWidth } from "@app/config/functions"
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from "react-native-image-picker"
import { Button, Card, Dialog, List } from "react-native-paper"
import { spacing } from "@app/theme/spacing"
import { Icon } from "@app/components/index"
import { translate } from "@app/i18n/translate"
import { TextPaper } from "@app/components/text-paper"
import colors from "@app/assets/colors"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
type Props = {
  onResult: (assets: Asset[]) => void
  turnOffModal: () => void
}

const ModalImagePicker = forwardRef((props: Props, _ref) => {
  const { turnOffModal, onResult } = props
  const [visible, setVisible] = useState(false)

  const requestCameraPermission = async (type: number) => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        })
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          if (type === 1) {
            onChupAnh()
          } else onChonAnh()
        } else {
          console.log("Camera permission denied")
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      if (type === 1) {
        onChupAnh()
      } else onChonAnh()
    }
  }
  const onChonAnh = () => {
    const options: any = {
      selectionLimit: 0,
      mediaType: "photo",
      includeBase64: false,
    }
    if (Platform.OS === "android") {
      turnOffModal && turnOffModal()
    }
    launchImageLibrary(options, onFinishPickImage)
  }

  const onChupAnh = async () => {
    let options: any = {
      title: "Select Image",
      includeBase64: true,
      customButtons: [
        {
          name: "customOptionKey",
          title: "Choose Photo from Custom Option",
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    }
    turnOffModal && turnOffModal()
    setTimeout(() => {
      launchCamera(options, onFinishPickImage)
    }, 500)
  }
  const onFinishPickImage = ({ assets }: ImagePickerResponse) => {
    if (assets && assets?.length > 0) {
      //   const currentImage = assets[0]
      //   const bodyUpload = {
      //     // uri:
      //     //   Platform.OS === "android" ? currentImage?.uri : currentImage?.uri?.replace("file://", ""),
      //     uri: currentImage?.uri,
      //     type: currentImage?.type,
      //     name: currentImage?.uri || currentImage.fileName,
      //   }
      onResult(assets)
    }
  }
  useImperativeHandle(_ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      setVisible(false)
    },
  }))
  const hide = () => {
    console.log("press")
    setVisible(false)
  }
  return (
    <Modal transparent visible={visible} onDismiss={hide}>
      <StatusBar backgroundColor={colors.backdrop} />

      <View style={styles.wrapperModal}>
        <TouchableOpacity
          style={[styles.background, { backgroundColor: colors.backdrop }]}
          activeOpacity={1}
          onPress={hide}
        />
        <Card mode="contained" style={styles.viewContai}>
          <TextPaper
            style={[
              styles.title,
              {
                marginTop: HEIGHT(spacing.xxl),
                marginBottom: HEIGHT(spacing.sm),
              },
            ]}
            variant="headlineSmall"
            color="onSurface"
            text={"Hình ảnh"}
          />
          <TextPaper
            style={styles.title}
            variant="bodyMedium"
            color="onSurfaceVariant"
            text={"Chụp ảnh hoặc tải ảnh từ thư viện của bạn."}
          />
          <View style={styles.wraperItem}>
            <List.Item
              onPress={() => {
                hide()
                requestCameraPermission(1)
              }}
              title={"Chụp ảnh"}
              left={() => {
                return <MaterialCommunityIcons name="camera-outline" size={WIDTH(24)} />
              }}
            />
            <List.Item
              onPress={() => {
                hide()
                requestCameraPermission(0)
              }}
              title={"Tải ảnh từ thư viện"}
              left={() => {
                return <MaterialCommunityIcons name="image-multiple-outline" size={WIDTH(24)} />
              }}
            />
          </View>
          <Dialog.Actions>
            <Button onPress={hide} textColor={colors.primary}>
              {translate("common.cancel")}
            </Button>
          </Dialog.Actions>
        </Card>
      </View>
    </Modal>
  )
})
export default ModalImagePicker
ModalImagePicker.displayName = "ModalImagePicker"
const styles = StyleSheet.create({
  title: {
    marginLeft: WIDTH(spacing.md),
    textAlign: "left",
  },
  wrapperModal: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  viewContai: {
    marginHorizontal: WIDTH(spacing.md),
    borderRadius: WIDTH(24),
    backgroundColor: colors.white,
  },
  wraperItem: {
    paddingHorizontal: WIDTH(spacing.md),
    marginTop: HEIGHT(spacing.lg),
  },
  background: {
    position: "absolute",
    width: getWidth(),
    height: "100%",
  },
})
