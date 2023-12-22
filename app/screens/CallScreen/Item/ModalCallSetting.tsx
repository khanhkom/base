import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native"
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { HEIGHT, WIDTH, getHeight } from "@app/config/functions"
import colors from "@app/assets/colors"
import { spacing } from "@app/theme/spacing"
import { Text } from "@app/components/Text"
import { Toggle } from "@app/components/Toggle"
import * as Animatable from "react-native-animatable"
import { translate } from "@app/i18n/translate"
import RNCallKeep from "react-native-callkeep"
import InCallManager from "react-native-incall-manager"

type Props = {}

const ModalCallSetting = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false)
  const [typeSound, setTypeSound] = useState(0)

  const hide = () => {
    setVisible(false)
  }
  useEffect(() => {
    async function getAudioList() {
      try {
        const device = await RNCallKeep.getAudioRoutes()

        console.log("Device :", device) // ["SPEAKER_PHONE","WIRED_HEADSET"]
      } catch (error) {
        console.warn("error::", error)
      }
    }
    getAudioList()
  }, [])
  const onReset = () => {}
  const onHandlApply = () => {
    hide()
  }
  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true)
    },
    hide() {
      hide()
    },
  }))
  const onPressSetAudio = async (index) => {
    if (index === 0) {
      // await RNCallKeep.setAudioRoute("uuid", "Speaker")
      console.log("onPressSetAudio:")
      let resAudio = await InCallManager.chooseAudioRoute("EARPIECE")
      console.log("resAudio::", resAudio)

      const device = await RNCallKeep.getAudioRoutes()

      setTypeSound(0)
      console.log("Device :", device) // ["SPEAKER_PHONE","WIRED_HEADSET"]
    } else {
      // await RNCallKeep.setAudioRoute("uuid", "Speaker")
      console.log("onPressSetAudio:")
      let resAudio = await InCallManager.chooseAudioRoute("SPEAKER_PHONE")

      console.log("resAudio::", resAudio)

      const device = await RNCallKeep.getAudioRoutes()
      setTypeSound(1)

      console.log("Device :", device) // ["SPEAKER_PHONE","WIRED_HEADSET"]
    }
  }
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        hide()
      }}
      transparent
      animationType="fade"
    >
      <Pressable style={styles.backdrop} onPress={hide} />
      <Animatable.View animation={"slideInRight"} duration={500} style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.head}>
              <Text size="xl" weight="semiBold" style={{ color: colors.gray_9 }}>
                Cài đặt
              </Text>
            </View>
            <View style={styles.session}>
              <Text size="md" weight="medium" style={{ color: colors.gray_9 }}>
                Âm thanh
              </Text>
              <Toggle
                variant="radio"
                label={"Điện thoại"}
                value={typeSound === 0}
                onPress={() => {
                  console.log("onPress")
                  onPressSetAudio(0)
                }}
                containerStyle={{ marginTop: HEIGHT(12) }}
              />
              <Toggle
                variant="radio"
                label={"Loa ngoài"}
                value={typeSound === 1}
                onPress={() => {
                  console.log("onPress")
                  onPressSetAudio(1)
                }}
                containerStyle={{ marginTop: HEIGHT(16) }}
              />
            </View>
          </View>
          <View style={styles.spacing} />
        </ScrollView>
      </Animatable.View>
    </Modal>
  )
})
export default ModalCallSetting
ModalCallSetting.displayName = "ModalCallSetting"

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.backdrop,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  bottomButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(spacing.sm),
    position: "absolute",
    width: WIDTH(280),
  },
  buttonApply: { borderRadius: 8, width: WIDTH(120) },
  container: {
    alignSelf: "center",
    backgroundColor: colors.white,
    height: HEIGHT(300),
    width: WIDTH(295),
    borderRadius: HEIGHT(12),
    marginTop: HEIGHT(100),
  },
  head: {
    paddingBottom: HEIGHT(spacing.md),
    paddingHorizontal: WIDTH(spacing.md),
    paddingTop: HEIGHT(32),
  },
  session: {
    paddingHorizontal: WIDTH(spacing.md),
    paddingVertical: HEIGHT(spacing.md),
  },
  spacing: { height: 100 },
})
